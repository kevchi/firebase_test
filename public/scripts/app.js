import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-functions.js";

// FIREBASE CONFIG MODULE
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);

export const app_Fi = app;
export const auth_Fi = auth;
export const functions_Fi = functions;

export const createUserWithEmailAndPassword_Fi = createUserWithEmailAndPassword;
export const signInWithEmailAndPassword_Fi = signInWithEmailAndPassword;
export const onAuthStateChanged_Fi = onAuthStateChanged;
export const signOut_Fi = signOut;
// Import other modules
import { checkAuthState } from "./auth.js";

checkAuthState();

const userSignIn = async () => {
	const signInEmailEl = signInEmail.value;
	const signInPasswordEl = signInPassword.value;
	signInWithEmailAndPassword(auth, signInEmailEl, signInPasswordEl)
		.then((userCredential) => {
			const user = userCredential.user;
			alert("You have signed in successfully!");
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode + errorMessage);
		});
};

const userSignUp = async () => {
	const signUpEmailEl = signUpEmail.value;
	const signUpPasswordEl = signUpPassword.value;
	createUserWithEmailAndPassword(auth, signUpEmailEl, signUpPasswordEl)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log(user);
			alert("Your account has been created!");
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode + errorMessage);
		});
};

const userSignOut = async () => {
  await signOut(auth);
};

const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

signUpButton.addEventListener("click", userSignUp);
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);

const signInHeader = document.querySelector(".button-box .active");
const signUpHeader = document.querySelector(".button-box .inactive");

signInHeader.addEventListener("click", (e) => {
	signInHeader.classList.remove("inactive");
	signUpHeader.classList.add("inactive");
	signInHeader.classList.add("active");
	signUpHeader.classList.remove("active");

	document.getElementById("signInForm").style.left = "0px";
	document.getElementById("signUpForm").style.left = "450px";
});

signUpHeader.addEventListener("click", (e) => {
	signInHeader.classList.remove("active");
	signUpHeader.classList.add("active");
	signInHeader.classList.add("inactive");
	signUpHeader.classList.remove("inactive");

	document.getElementById("signInForm").style.left = "-450px";
	document.getElementById("signUpForm").style.left = "0px";
});

function validateTransactionData(data) {
  const errorMessages = [];

  if (!data.companyPersonName || data.companyPersonName.trim() === '') {
    errorMessages.push('Company or Person Name is required.');
  }
  if (!data.description || data.description.trim() === '') {
    errorMessages.push('Description is required.');
  }
  if (!data.transactionType) {
    errorMessages.push('Transaction Type is required.');
  }
  if (isNaN(data.amount)) {
    errorMessages.push('Amount must be a valid number.');
  }

  if (errorMessages.length > 0) {
    // Display error messages to the user
    alert(errorMessages.join('\n'));
    return false;
  }

  return true;
}

document.querySelector('.transactionDetails').addEventListener('submit', function(event) {
  event.preventDefault();

    // Clear previous error message
    document.querySelector('.error').textContent = '';

  // Collect form data
  const transactionData = {
    companyPersonName: event.target.companyPersonName.value,
    description: event.target.description.value,
    transactionType: event.target.transactionType.value,
    amount: parseFloat(event.target.amount.value),
  };

  // Client-side validation
  const isValid = validateTransactionData(transactionData);
  if (!isValid) {
    return; // Prevent function call if invalid
  }

  // Call the Cloud Function
  const addTransactionFunction = httpsCallable(functions, "addTransaction");
  addTransactionFunction(transactionData)
    .then((result) => {
      // Transaction added successfully
      console.log('Transaction added:', result);
      // Clear form fields or provide success feedback
      alert('Transaction added:')
      
      // Clear form fields
      event.target.reset();
    })
    .catch((error) => {
      // Handle errors
      console.error('Error adding transaction:', error);
      console.error('Detailed error object:', JSON.stringify(error, null, 2));
      document.querySelector('.error').textContent = error.message || 'An error occurred while submitting the form.';
    });
});


// import { tr} from "../scripts/transactions.js"

// tr()