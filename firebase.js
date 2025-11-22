// firebase.js
// Updated for your new project: astrophotography-with-zerox
const firebaseConfig = {
  apiKey: "AIzaSyAvoeiw_fwmSkFN97hGzSsUTn2KJ1G2jQc",
  authDomain: "astrophotography-with-zerox.firebaseapp.com",
  databaseURL: "https://astrophotography-with-zerox-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "astrophotography-with-zerox",
  storageBucket: "astrophotography-with-zerox.firebasestorage.app",
  messagingSenderId: "847847244230",
  appId: "1:847847244230:web:ecd8f9066f385a025072c7",
  measurementId: "G-38YEEM9D71"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ZTA Auth Helper – Clean & Powerful
const ZTA = {
    // Sign up
    signup() {
        const name = document.getElementById("regName")?.value.trim() || "User";
        const email = document.getElementById("regEmail")?.value.trim();
        const password = document.getElementById("regPassword")?.value;

        if (!email || !password) return alert("Please fill all fields");
        if (password.length < 6) return alert("Password must be 6+ characters");

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(cred => cred.user.updateProfile({ displayName: name }))
            .then(() => {
                alert("Account created successfully!");
                window.location.href = "index.html";
            })
            .catch(err => alert("Sign Up failed: " + err.message));
    },

    // Login
    login() {
        const email = document.getElementById("loginEmail")?.value.trim();
        const password = document.getElementById("loginPassword")?.value;

        if (!email || !password) return alert("Please enter email & password");

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => window.location.href = "index.html")
            .catch(err => alert("Login failed: " + err.message));
    },

    // Google Sign-In
    google() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(() => window.location.href = "index.html")
            .catch(err => alert("Google Sign-In failed: " + err.message));
    },

    // Logout
    logout() {
        firebase.auth().signOut()
            .then(() => {
                alert("Logged out successfully");
                window.location.reload();
            });
    },

    // Get current user
    user() {
        return firebase.auth().currentUser;
    },

    // Auth state listener (use on every page)
    onAuthChange(callback) {
        firebase.auth().onAuthStateChanged(user => callback(user));
    }
};

// Auto log current user status in console (optional)
ZTA.onAuthChange(user => {
    if (user) {
        console.log("%cZTA → Logged in:", "color:#9acd32;font-weight:bold;", user.displayName || user.email);
    } else {
        console.log("%cZTA → Guest mode", "color:#666;font-style:italic;");
    }
});
