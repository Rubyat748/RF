<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

<script>
// ---------------------------------------------
// 🔥 FIREBASE CONFIG
// ---------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDelkwsOVmHcGrP4MV6o0weFrPyrjsExvM",
  authDomain: "zerox-a7ed6.firebaseapp.com",
  projectId: "zerox-a7ed6",
  storageBucket: "zerox-a7ed6.firebasestorage.app",
  messagingSenderId: "847831795606",
  appId: "1:847831795606:web:43f71bc1cc8f7f9bbe7fb7",
  measurementId: "G-MCRR6C3XQ8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ---------------------------------------------
// 🎖 RANK CODES
// ---------------------------------------------
const rankCodes = {
  "VX9e!mA2Qf#7": "Starlight Beginner",
  "pL4$X7wq@D8r": "Night Sky Explorer",
  "Zu1!kM9#Tf4P": "Lens Apprentice",
  "R3q%vB!8nL2s": "Star Tracker",
  "yT7@Fh2$Qm6K": "Deep-Sky Learner",
  "Jx8&bP1!Zw4r": "Celestial Shooter",
  "mQ9@tC5#Hv2E": "Cosmic Observer",
  "Wf3!Zk7%Ua9p": "Galaxy Seeker",
  "Tg6$R2n@Yp4V": "Nebula Hunter",
  "Bq1!S8m%Xe7H": "Meteor Master",
  "Fv4#hP9*Ld3C": "Astro Voyager",
  "Kw2!R7q@Mz6S": "Sky Illumination Pro",
  "Pj3$N8l#Tc5A": "Cosmic Artisan",
  "Sf9@xB4!Hm1D": "Interstellar Photographer",
  "Lk5#Q2n!Vz8M": "Deep-Space Elite",
  "Rg7!Wm3$Td9F": "Astro Imaging Expert",
  "Uc8@Kp6#Hb2L": "Galactic Master",
  "Yn4!Sd1%Xj7Q": "Nebula Grandmaster",
  "Zt6#Mw8@Pc3F": "Celestial Legend",
  "Qx9$Fe5!Vr2B": "Universe Prime"
};

// ---------------------------------------------
// 🚀 REDEEM FUNCTION
// ---------------------------------------------
async function redeemCode() {
  const input = document.getElementById("codeInput").value.trim();
  const status = document.getElementById("status");

  const user = firebase.auth().currentUser;
  if (!user) {
    status.textContent = "⚠ Login required to redeem.";
    status.style.color = "#ff4444";
    return;
  }

  if (!rankCodes[input]) {
    status.textContent = "❌ INVALID CODE";
    status.style.color = "#ff4444";
    return;
  }

  const codeDoc = await db.collection("usedCodes").doc(input).get();
  if (codeDoc.exists) {
    status.textContent = "❌ THIS CODE IS ALREADY USED";
    status.style.color = "#ff4444";
    return;
  }

  const rank = rankCodes[input];

  await db.collection("users").doc(user.uid).set({
    rank: rank,
    rankCode: input,
    redeemedAt: new Date()
  }, { merge: true });

  await db.collection("usedCodes").doc(input).set({
    usedBy: user.uid,
    usedAt: new Date()
  });

  status.textContent = "✔ RANK UNLOCKED: " + rank;
  status.style.color = "#72fe95";

  document.getElementById("codeInput").value = "";
}

// ---------------------------------------------
// ⭐ STARFIELD ANIMATION
// ---------------------------------------------
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

let stars = [];
const count = 900;

for (let i = 0; i < count; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3,
    s: Math.random() * 0.8 + 0.2
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#9acd32";

  stars.forEach(s => {
    ctx.globalAlpha = s.s;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += 0.8;
    if (s.y > h) s.y = 0;
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});
</script>
