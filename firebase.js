// firebase.js
// Latest config for project: zerox-a7ed6
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

// ZTA / ZeroX Auth System (Ultra Clean & Premium)
const ZeroX = {

    // Sign Up
    signup() {
        const name = document.getElementById("regName")?.value.trim() || "Cosmonaut";
        const email = document.getElementById("regEmail")?.value.trim();
        const password = document.getElementById("regPassword")?.value;

        if (!email || !password) return alert("Please fill all fields");
        if (password.length < 6) return alert("Password must be 6+ characters");

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(cred => cred.user.updateProfile({ displayName: name }))
            .then(() => {
                // Store basic Firestore user data
                firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                    rank: "Starlight Beginner",
                    captures: 0,
                    likes: 0
                });

                alert("Welcome to the cosmos, " + name + "!");
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
                const uid = result.user.uid;

                firebase.firestore().collection("users").doc(uid).get()
                    .then(doc => {
                        if (!doc.exists) {
                            firebase.firestore().collection("users").doc(uid).set({
                                rank: "Starlight Beginner",
                                captures: 0,
                                likes: 0
                            });
                        }
                    });

                window.location.href = "index.html";
            })
            .catch(err => alert("Google login failed: " + err.message));
    },

    // Logout
    logout() {
        firebase.auth().signOut().then(() => {
            alert("Logged out. See you among the stars.");
            window.location.reload();
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
        console.log(
            "%cZeroX → Active Pilot:",
            "color:#9acd32;font-size:16px;font-weight:bold;",
            user.displayName || user.email
        );
    } else {
        console.log(
            "%cZeroX → Standing by",
            "color:#555;font-size:14px;font-style:italic;"
        );
    }
});
