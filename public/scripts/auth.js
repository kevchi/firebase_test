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
			document.querySelector("#signUpForm").style.display = "none";
			document.querySelector("#signInForm").style.display = "none";
			document.querySelector("#transactions").style.display = "block";
		} else {
			document.querySelector("#nav-wrap").style.display = "none";
			document.querySelector("#signInForm").style.display = "inline-block";
			document.querySelector("#signUpForm").style.display = "inline-block";
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

export const userSignIn = async () => {
	const signInEmailEl = signInEmail.value;
	const signInPasswordEl = signInPassword.value;
	signInWithEmailAndPassword_Fi(auth, signInEmailEl, signInPasswordEl)
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

export const userSignUp = async () => {
	const signUpEmailEl = signUpEmail.value;
	const signUpPasswordEl = signUpPassword.value;
	createUserWithEmailAndPassword_Fi(auth, signUpEmailEl, signUpPasswordEl)
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

export const userSignOut = async () => {
	await signOut_Fi(auth);
};
