// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
