// config.js - Global Configuration and Utilities for EduMath TBS

// ======================= CONSTANTS =======================
const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxs6EVw0A7GjsyKKlveL0STj1ZTa_iDS0XpliDMKfpuACN_ZmNFIpIKU23XKHQm_oSu/exec";
const SUPER_ADMIN_EMAIL = 'tailieutoantbs@gmail.com';
const CLOUD_NAME = "drbxhjhur"; 
const UPLOAD_PRESET = "TAILIEUTBS";

// ======================= FIREBASE INIT =======================
const firebaseConfig = { 
    apiKey: "AIzaSyAyL8ezUs1OuxTYBD6PATYk-WpBxOqMGj8", 
    authDomain: "cosodulieutbs.firebaseapp.com", 
    databaseURL: "https://cosodulieutbs-default-rtdb.asia-southeast1.firebasedatabase.app", 
    projectId: "cosodulieutbs", 
    storageBucket: "cosodulieutbs.firebasestorage.app", 
    messagingSenderId: "14840398924", 
    appId: "1:14840398924:web:eccc6942166181d6c8e0e9" 
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ======================= UTILITIES =======================
/**
 * Show a toast notification
 * @param {string} msg - The message to display
 * @param {boolean} isError - True if it's an error message
 */
function showToast(msg, isError = false) {
    const toast = document.getElementById('toast-success'); 
    if (toast) {
        // Remove previous color classes
        toast.classList.remove('bg-green-500', 'bg-red-500', 'bg-emerald-500', 'bg-rose-500');
        
        // Add new color class
        const bgClass = isError ? 'bg-red-500' : 'bg-emerald-500';
        toast.classList.add(bgClass);
        
        // Setup icon
        const iconClass = isError ? 'fa-circle-xmark' : 'fa-circle-check';
        
        // Check if there is a span element
        const msgSpan = document.getElementById('toast-msg');
        if (msgSpan) {
            toast.innerHTML = `<i class="fa-solid ${iconClass} text-3xl"></i><span id="toast-msg" class="ml-3 font-bold">${msg}</span>`;
        } else {
            toast.innerHTML = `<i class="fa-solid ${iconClass} text-3xl"></i><span class="ml-3 font-bold">${msg}</span>`;
        }

        toast.classList.remove('-translate-y-32', 'opacity-0'); 
        
        // Clear any existing timeout
        if (window.toastTimeout) {
            clearTimeout(window.toastTimeout);
        }
        
        window.toastTimeout = setTimeout(() => {
            toast.classList.add('-translate-y-32', 'opacity-0');
        }, 3000);
    } else {
        // Fallback if toast element doesn't exist
        console.log(isError ? "Error: " : "Success: ", msg);
    }
}

/**
 * Play a sound effect
 * @param {string} type - 'correct', 'wrong', or 'powerup'
 */
function playSound(type) { 
    const audio = document.getElementById('audio-' + type); 
    if (audio) { 
        audio.currentTime = 0; 
        audio.play().catch(e => { console.warn("Cannot play sound:", e); }); 
    } 
}

/**
 * Trigger MathJax and Highlight.js to re-render
 */
function triggerMathJax() { 
    if(window.MathJax) MathJax.typesetPromise(); 
    if(window.hljs) hljs.highlightAll(); 
}

/**
 * Trigger Confetti effect
 */
function triggerConfetti() { 
    if(window.confetti) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } }); 
    }
}
