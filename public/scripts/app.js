// @ts-check

// Import the required Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import * as functions from 'firebase/functions'; // Remove if not used directly
import { getStorage } from 'firebase/storage';

import { openModal, closeModal } from './modals.js';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app); // Initialize Firestore instance
const auth = getAuth(app);
const storage = getStorage(app);


// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');



// const setupUI = (user) => {
//     if (user) {
//       if (user.admin) {
//         adminItems.forEach(item => item.style.display = 'block');
//       }
//       // account info
//       db.collection('users').doc(user.uid).get().then(doc => {
//         const html = `
//           <div>Logged in as ${user.email}</div>
//           <div>${doc.data().bio}</div>
//           <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
//         `;
//         accountDetails.innerHTML = html;
//       });
//       // toggle user UI elements
//       loggedInLinks.forEach(item => item.style.display = 'block');
//       loggedOutLinks.forEach(item => item.style.display = 'none');
//     } else {
//       // clear account info
//       accountDetails.innerHTML = '';
//       // toggle user elements
//       adminItems.forEach(item => item.style.display = 'none');
//       loggedInLinks.forEach(item => item.style.display = 'none');
//       loggedOutLinks.forEach(item => item.style.display = 'block');
//     }
//   };


// // setup guides
// const setupGuides = (data) => {
//   if (data.length) {
//     let html = '';
//     data.forEach((doc) => {
//       const guide = doc.data();
//       const li = `
//         <li>
//           <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
//           <div class="collapsible-body white"> ${guide.content} </div>
//         </li>
//       `;
//       html += li;
//     });
//     guideList.innerHTML = html;
//   } else {
//     guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
//   }
// };

// // setup materialize components
// document.addEventListener('DOMContentLoaded', function () {
//   var modals = document.querySelectorAll('.modal');
//   M.Modal.init(modals);

//   var items = document.querySelectorAll('.collapsible');
//   M.Collapsible.init(items);
// });

// // Listen for authentication state changes
// onAuthStateChanged(auth, (user) => {
//   setupUI(user);
// });




// const setupUI = (user) => {
//   if (user) {
//     if (user.admin) {
//       adminItems.forEach((item) => (item.style.display = 'block'));
//     }
//     // account info
//     getDocs(collection(firestore, 'users')).then((docs) => {
//       docs.forEach((doc) => {
//         if (doc.id === user.uid) {
//           const html = `
//             <div>Logged in as ${user.email}</div>
//             <div>${doc.data().bio}</div>
//             <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
//           `;
//           accountDetails.innerHTML = html;
//         }
//       });
//     });
//     // toggle user UI elements
//     loggedInLinks.forEach((item) => (item.style.display = 'block'));
//     loggedOutLinks.forEach((item) => (item.style.display = 'none'));
//   } else {
//     // clear account info
//     accountDetails.innerHTML = '';
//     // toggle user elements
//     adminItems.forEach((item) => (item.style.display = 'none'));
//     loggedInLinks.forEach((item) => (item.style.display = 'none'));
//     loggedOutLinks.forEach((item) => (item.style.display = 'block'));
//   }
// };


// const appSettings = {
//     databaseURL: "https://fir-test-4b4a3-default-rtdb.firebaseio.com/"
//   }    

//   const appSettings = {
//     databaseURL: "https://YOUR_WEB_APP_HOSTING_NAME-default-rtdb.firebaseio.com/"
//   }     



