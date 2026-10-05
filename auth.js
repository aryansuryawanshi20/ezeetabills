// Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyBLno3wKlARYkg9GIs_gRKtNYU6MKUd6iE",
  authDomain: "ezee-tabill.firebaseapp.com",
  projectId: "ezee-tabill",
  appId: "1:932933237909:web:330fc6fc568c93059eaf9c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// List of admin users who can bypass payment
const bypassUsers = [
  { email: "ganeshasurya83@gmail.com", password: "gudia@25" },
  { email: "aryanvgsurya@gmail.com", password: "aryan@2004" }
];

// Firebase Auth Handlers
function register() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => alert('Registered! Now log in.'))
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;

  // Check if this is a bypass user
  const isBypassUser = bypassUsers.some(user => user.email === email && user.password === pass);

  if (isBypassUser) {
    alert("Admin Login - Payment bypassed.");
    localStorage.setItem('paidUser', 'true');
    window.location.href = "index.html";
    return;
  }

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      alert('Logged in! Now proceed to payment.');
    })
    .catch(err => alert(err.message));
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      alert('Google login successful! Now proceed to payment.');
    })
    .catch(err => alert(err.message));
}

// Razorpay Payment
function payNow() {
  const user = auth.currentUser;
  if (!user) return alert("Please login first.");

  const options = {
    key: "rzp_test_SQ3vVRbxcSClHo", // Razorpay Test Key
    amount: 550000, // 1 INR = 100 paisa
    currency: "INR",
    name: "EZEE Access",
    description: "Access Payment",
    handler: function (response) {
      alert("Payment successful!");
      localStorage.setItem('paidUser', 'true');
      window.location.href = "index.html";
    },
    prefill: {
      email: user.email
    },
    theme: {
      color: "#388e3c"
    }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}
