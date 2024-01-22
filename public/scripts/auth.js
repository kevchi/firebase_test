/** @format */

import {
	auth,
	createUserWithEmailAndPassword_Fi,
	signInWithEmailAndPassword_Fi,
	onAuthStateChanged_Fi,
	signOut_Fi,
} from "./app.js";

export const checkAuthState = async () => {
	onAuthStateChanged_Fi(auth, (user) => {
		if (user) {
			document.querySelector("#nav-wrap").style.display = "block";
			document.querySelector(".authForm").style.display = "none";
			document.querySelector("#transactions").style.display = "block";
		} else {
			document.querySelector("#nav-wrap").style.display = "none";
			document.querySelector(".authForm").style.display = "flex";
			document.querySelector("#transactions").style.display = "none";
		}
	});
};

const signInEmail = document.querySelector("#signInEmail");
const signInPassword = document.querySelector("#signInPassword");
const signInForm = document.querySelector("#signInForm");

const signUpEmail = document.querySelector("#signUpEmail");
const signUpPassword = document.querySelector("#signUpPassword");
const signUpForm = document.querySelector("#signUpForm");

const secretContent = document.querySelector("#secretContent");
const signOut = document.querySelector("#signOut");

// export const userSignIn = document.querySelector("#LogInForm");
// userSignIn.addEventListener(submit, (e)=> {
//     e.preventDefault();
//     const signInEmail = userSignIn['signInEmail'].value;
//     const signInPassword = userSignIn['signInPassword'].value;

//     auth.signInWithEmailAndPassword_Fi(signInEmail, signInPassword).then(eventObj => {
//         console.log(eventObj)
//     })
// })
