// @ts-check

import { getAuth } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { openModal, closeModal } from './modals.js';

const auth = getAuth();
const firestore = getFirestore(); // Access Firestore instance directly

// Import the addAdminRole function from the functions/index.js file
import { addAdminRole } from '../../functions/index.js';

// Event listener for adding admin role
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRoleFunction = httpsCallable(functions, 'addAdminRole');
  addAdminRoleFunction({ email: adminEmail })
    .then((result) => {
      console.log(result);
      // Add any necessary UI updates or feedback here
    })
    .catch((error) => {
      console.error('Error adding admin role:', error);
      // Handle errors appropriately, e.g., display error messages
    });
});

// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult()
      .then((idTokenResult) => {
        user.admin = idTokenResult.claims.admin;
        setupUI(user); // Call setupUI to configure UI based on user status
      })
      .catch((error) => {
        console.error('Error getting ID token:', error);
      });

    // Get guides from Firestore directly
    getDocs(collection(firestore, 'guides'))
      .then((snapshot) => {
        setupGuides(snapshot.docs);
      })
      .catch((error) => {
        console.error('Error fetching guides:', error);
      });
  } else {
    setupUI(); // Call setupUI for non-authenticated state
    setupGuides([]);
  }
});

// ... (rest of the code remains the same)
