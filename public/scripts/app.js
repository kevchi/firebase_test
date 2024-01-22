/** @format */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// FIREBASE CONFIG MODULE
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);

// export Firebase Functions
export const auth = getAuth(app);
export const createUserWithEmailAndPassword_Fi = createUserWithEmailAndPassword;
export const signInWithEmailAndPassword_Fi = signInWithEmailAndPassword;
export const onAuthStateChanged_Fi = onAuthStateChanged;
export const signOut_Fi = signOut;

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
