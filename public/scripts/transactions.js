import { app_Fi } from '../scripts/app.js';
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { checkAuthState } from "./auth.js";

// Initialize Firebase Firestore
const app = app_Fi;
const db = getFirestore(app);

// Check authentication state
checkAuthState();

// Reference to the 'transactions' collection in Firestore
const transactionsRef = collection(db, "transactions");

// Listen for real-time updates in the 'transactions' collection
onSnapshot(transactionsRef, (snapshot) => {
  let transactions = [];
  snapshot.forEach((doc) => {
    transactions.push({ ...doc.data(), id: doc.id });
  });
  console.log(transactions);
  let html = "";
  transactions.forEach(transaction => {
    // Update this line to include companyPersonName
    html += `<li>${transaction.companyPersonName}</li>`;
  })
  document.querySelector(".showlist").innerHTML = html;
});




// export { tr };