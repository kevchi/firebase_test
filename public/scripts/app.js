
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut

} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// FIREBASE CONFIG MODULE
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);

// export Firebase Functions
export const auth = getAuth(app);
export const createUserWithEmailAndPassword_Fi = createUserWithEmailAndPassword();
export const signInWithEmailAndPassword_Fi = signInWithEmailAndPassword();
export const onAuthStateChanged_Fi = onAuthStateChanged();
export const signOut_Fi = signOut();

import { checkAuthState, userSignUp, userSignIn, userSignOut } from './auth.js';


checkAuthState();

const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");


signUpButton.addEventListener('click', userSignUp);
signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);