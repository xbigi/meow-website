// Register User
window.registerUser = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value; // Handle username appropriately
    
    // Firebase registration
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successfully registered
            alert("Registration successful!");
            document.getElementById('registerModal').style.display = 'none'; // Close modal
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

// Login User
window.loginUser = function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Firebase login
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successfully logged in
            alert("Login successful!");
            document.getElementById('loginModal').style.display = 'none'; // Close modal
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};

// Show Forgot Password
window.showForgotPassword = function() {
    document.getElementById('loginModal').style.display = 'none'; // Close login modal
    document.getElementById('forgotPasswordModal').style.display = 'block'; // Show forgot password modal
};

// Switch to Register
window.switchToRegister = function() {
    document.getElementById('loginModal').style.display = 'none'; // Close login modal
    document.getElementById('registerModal').style.display = 'block'; // Show register modal
};

// Send Password Reset
window.sendPasswordReset = function() {
    const email = document.getElementById('forgotEmail').value;
    
    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent!");
            document.getElementById('forgotPasswordModal').style.display = 'none'; // Close modal
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
};
