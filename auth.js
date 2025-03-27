/* Ensure Babel transpilation for Safari support */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBT1tyWo4YNd39Qc4TDKwz-Ln-gmjKbMhs",
    authDomain: "eventzzfinal.firebaseapp.com",
    projectId: "eventzzfinal",
    storageBucket: "eventzzfinal.firebasestorage.app",
    messagingSenderId: "1019438629207",
    appId: "1:1019438629207:web:26c11bd4a430771e443e12",
    measurementId: "G-Q0ZQGFLL1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase Auth Loaded:", auth); // Check if Firebase is working

// ✅ Protect Pages (Redirect if not logged in)
const protectedPages = ["create-event.html"]; // Add more pages if needed
const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            alert("You must be logged in to access this page!");
            window.location.href = "login.html"; // Redirect to login
        }
    });
}

// ✅ Signup Function
document.getElementById("signup-btn")?.addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful!");
      window.location.href = "index.html"; // Redirect to homepage
    })
    .catch((error) => alert(error.message));
});

// ✅ Login Function
document.getElementById("login-btn")?.addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to homepage
    })
    .catch((error) => alert(error.message));
});

// ✅ Logout Function
document.getElementById("logout-btn")?.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "login.html";
    })
    .catch((error) => alert(error.message));
});
