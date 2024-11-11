import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkKNoQzwgu4uCAAVfz0fvzN6LxS1XIT44",
    authDomain: "xbigi-xyz.firebaseapp.com",
    projectId: "xbigi-xyz",
    storageBucket: "xbigi-xyz.firebasestorage.app",
    messagingSenderId: "144509631205",
    appId: "1:144509631205:web:05833a87185f4c7ea0320c",
    measurementId: "G-49T7BK2PJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show Success or Error Message
function showMessage(message, type = 'success') {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 4000);
}

// Toggle Profile Menu Visibility
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.toggle('visible');
}

// Show User Profile and Hide Login/Register Button
function showUserProfile(username) {
    document.getElementById('usernameDisplay').textContent = `👤 ${username}`;
    document.getElementById('userProfile').style.display = 'flex';
    document.getElementById('loginRegisterButton').style.display = 'none';
}

// Hide User Profile and Show Login/Register Button
function hideUserProfile() {
    document.getElementById('userProfile').style.display = 'none';
    document.getElementById('loginRegisterButton').style.display = 'block';
}

// Register User and Send Verification Email
document.getElementById('registerForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Send verification email
        await sendEmailVerification(user);
        showMessage('Registration successful! Please check your email to verify your account.');

        // Sign out immediately to require email verification
        await signOut(auth);

        closeAuthModal();
    } catch (error) {
        showMessage(`Registration failed: ${error.message}`, 'error');
    }
};

// Login User with Verification Check
document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if email is verified
        if (user.emailVerified) {
            closeAuthModal();
            showMessage('Successfully logged in!');
            showUserProfile(user.email);
        } else {
            showMessage('Please verify your email before logging in.', 'error');
            await signOut(auth);
        }
    } catch (error) {
        showMessage(`Login failed: ${error.message}`, 'error');
    }
};

// Send Password Reset Email from Profile
function resetPassword() {
    const user = auth.currentUser;
    if (user) {
        sendPasswordResetEmail(auth, user.email)
            .then(() => showMessage('Password reset email sent!'))
            .catch(error => showMessage(`Failed to send reset email: ${error.message}`, 'error'));
    }
}

// Log Out Function
function logout() {
    signOut(auth).then(() => {
        showMessage('Logged out successfully');
        hideUserProfile();
    }).catch((error) => {
        showMessage(`Logout failed: ${error.message}`, 'error');
    });
}

// Track Auth State for Showing User Profile
onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
        showUserProfile(user.email);
    } else {
        hideUserProfile();
    }
});

// Modal Controls
function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    showTab('login');
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Tab Switching for Login, Register, and Forgot Password
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.querySelector(`button[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Attach Event Listeners
document.getElementById('usernameDisplay').addEventListener('click', toggleProfileMenu);
document.getElementById('forgotPasswordForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;

    try {
        await sendPasswordResetEmail(auth, email);
        closeAuthModal();
        showMessage('Password reset email sent successfully!');
    } catch (error) {
        showMessage(`Failed to send reset email: ${error.message}`, 'error');
    }
};

// Attach modal and logout functions globally for inline usage
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.showTab = showTab;
window.logout = logout;
window.resetPassword = resetPassword;
// JavaScript to fetch user's location data, including ISP and timezone, and display it
document.getElementById('funnyButton').addEventListener('click', async function() {
    try {
        // Fetch user's IP and location info from ipapi.co
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Display location data, including ISP and timezone, in an alert box
        const message = `
            IP Address: ${data.ip}
            Country: ${data.country_name}
            Region: ${data.region}
            City: ${data.city}
            Coordinates: ${data.latitude}, ${data.longitude}
            ISP: ${data.org}
            Timezone: ${data.timezone}
        `;
        alert(message);
    } catch (error) {
        alert('Unable to retrieve location data.');
        console.error('Error fetching location data:', error);
    }
});
window.addEventListener('load', async function() {
    const mainTitleEl = document.getElementById('mainTitle');
    const defaultPhrase = "Welcome to xbigi.xyz";

    // Define a set of supported language codes for the API
    const supportedLanguages = new Set([
        'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh-cn', 'ja', 'ko', 'ar', 'nl', 'tr', 'pl'
    ]);

    try {
        // Fetch user's IP and location info
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Get the user's country code and convert it to a language code (ISO 639-1)
        let languageCode = data.country_code.toLowerCase(); // Example: 'us' for United States

        // If language is unsupported, or is English, fallback to English
        if (!supportedLanguages.has(languageCode) || languageCode === 'en') {
            mainTitleEl.textContent = defaultPhrase;
            return; // Skip translation as English is already the default
        }

        // Define the phrase to be translated
        const phrase = defaultPhrase;

        // Attempt translation with the validated language code
        let translatedGreeting = await translatePhrase(phrase, languageCode);
        
        // Fallback to default phrase if translation fails
        if (!translatedGreeting) {
            translatedGreeting = defaultPhrase;
        }

        // Display the translated or fallback greeting in the main title
        mainTitleEl.textContent = translatedGreeting;

    } catch (error) {
        mainTitleEl.textContent = defaultPhrase; // Use default greeting as fallback
        console.error('Error fetching location or translation data:', error);
    }
});

/**
 * Function to translate a phrase using MyMemory API.
 * @param {string} phrase - Phrase to be translated
 * @param {string} languageCode - Target language code (ISO 639-1 format)
 * @returns {string|null} Translated phrase or null if translation fails
 */
async function translatePhrase(phrase, languageCode) {
    try {
        // Call the MyMemory translation API with the specified language
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(phrase)}&langpair=en|${languageCode}`);
        const data = await response.json();

        // Check if translation was successful and return the translated text
        if (data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }

        // If there's an error or no translation, log and return null
        console.warn(`Translation not available for language: ${languageCode}`);
        return null;
    } catch (error) {
        console.error(`Translation error for language ${languageCode}:`, error);
        return null;
    }
}
