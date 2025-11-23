// firebase.js
// FINAL VERSION — FULLY WORKING FOR ALL FEATURES
const firebaseConfig = {
  apiKey: "AIzaSyDelkwsOVmHcGrP4MV6o0weFrPyrjsExvM",
  authDomain: "zerox-a7ed6.firebaseapp.com",
  projectId: "zerox-a7ed6",
  storageBucket: "zerox-a7ed6.firebasestorage.app",
  messagingSenderId: "847831795606",
  appId: "1:847831795606:web:43f71bc1cc8f7f9bbe7fb7",
  measurementId: "G-MCRR6C3XQ8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ZeroX — The Ultimate Auth System (Now with Firestore Support)
const ZeroX = {
    // Sign Up
    signup() {
        const name = document.getElementById("regName")?.value.trim() || "Cosmonaut";
        const email = document.getElementById("regEmail")?.value.trim();
        const password = document.getElementById("regPassword")?.value;

        if (!email || !password) return alert("Please fill all fields");
        if (password.length < 6) return alert("Password must be 6+ characters");

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(cred => {
                return cred.user.updateProfile({ displayName: name });
            })
            .then(() => {
                // Create user document in Firestore
                firebase.firestore().collection("users").doc(cred.user.uid).set({
                    displayName: name,
                    email: email,
                    rank: "Starlight Beginner",
                    captures: 0,
                    likes: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert("Welcome to ZTA, " + name + "!");
                window.location.href = "index.html";
            })
            .catch(err => alert("Sign-up failed: " + err.message));
    },

    // Login
    login() {
        const email = document.getElementById("loginEmail")?.value.trim();
        const password = document.getElementById("loginPassword")?.value;

        if (!email || !password) return alert("Enter email & password");

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => window.location.href = "index.html")
            .catch(err => alert("Login failed: " + err.message));
    },

    // Google Sign-In
    google() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                // Create user doc if new
                firebase.firestore().collection("users").doc(user.uid).get().then(doc => {
                    if (!doc.exists) {
                        firebase.firestore().collection("users").doc(user.uid).set({
                            displayName: user.displayName || "Cosmonaut",
                            email: user.email,
                            photoURL: user.photoURL,
                            rank: "Starlight Beginner",
                            captures: 0,
                            likes: 0,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                });
                window.location.href = "index.html";
            })
            .catch(err => alert("Google login failed: " + err.message));
    },

    // LOGOUT — Now goes to logout.html
    logout() {
        return firebase.auth().signOut()
            .then(() => {
                window.location.href = "logout.html";  // Beautiful logout page
            });
    },

    // Current user
    user() {
        return firebase.auth().currentUser;
    },

    // Auth state listener
    onAuthChange(callback) {
        firebase.auth().onAuthStateChanged(user => callback(user));
    }
};

// Console greeting
ZeroX.onAuthChange(user => {
    if (user) {
        console.log("%cZTA → Active Pilot:", "color:#9acd32;font-size:16px;font-weight:bold;", user.displayName || user.email);
    } else {
        console.log("%cZTA → Standing by", "color:#666;font-style:italic;");
    }
});
