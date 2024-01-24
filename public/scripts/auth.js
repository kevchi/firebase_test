/** @format */

import {
	auth_Fi,
	createUserWithEmailAndPassword_Fi,
	signInWithEmailAndPassword_Fi,
	onAuthStateChanged_Fi,
	signOut_Fi,
} from "./app.js";

export const checkAuthState = async () => {
	onAuthStateChanged_Fi(auth_Fi, (user) => {
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

