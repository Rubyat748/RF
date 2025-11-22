// firebase.js
// Your Firebase config (from your project "zta-only")
const firebaseConfig = {
    apiKey: "AIzaSyB7P7DL0zypsux8x0fIf4v0UMNVR30GB_k",
    authDomain: "zta-only.firebaseapp.com",
    projectId: "zta-only",
    storageBucket: "zta-only.firebasestorage.app",
    messagingSenderId: "26521974056",
    appId: "1:26521974056:web:e3bfe3e1bb02fd60ad0c1d",
    measurementId: "G-HR9W0GJ4MT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ZTA Auth Helper (clean & powerful)
const ZTA = {
    // Sign up with email & password
    signup(email, password, name = "User") {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(cred => cred.user.updateProfile({ displayName: name }))
            .then(() => console.log("Signed up & logged in"))
            .catch(err => alert("Sign Up Failed: " + err.message));
    },

    // Login
    login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => console.log("Logged in"))
            .catch(err => alert("Login Failed: " + err.message));
    },

    // Logout
    logout() {
        return firebase.auth().signOut()
            .then(() => console.log("Logged out"));
    },

    // Password reset
    resetPassword(email) {
        return firebase.auth().sendPasswordResetEmail(email)
            .then(() => alert("Password reset email sent!"))
            .catch(err => alert(err.message));
    },

    // Get current user (sync)
    user() {
        return firebase.auth().currentUser;
    },

    // Listen to auth state (used on every page)
    onAuthChange(callback) {
        firebase.auth().onAuthStateChanged(user => {
            callback(user);
        });
    }
};

// Optional: Auto-run on every page to show user status in console
ZTA.onAuthChange((user) => {
    if (user) {
        console.log("%cZTA Logged in as:", "color:#9acd32;font-size:14px;font-weight:bold", user.email);
    } else {
        console.log("%cZTA Guest mode", "color:#666;font-style:italic");
    }
});
