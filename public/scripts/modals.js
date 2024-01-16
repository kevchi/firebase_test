// @ts-check

import M from 'materialize-css';

export function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    console.error(`Modal with ID "${modalId}" not found.`);
    return;
  }

  // Ensure Materialize is initialized first
  if (!M.Modal.getInstance(modal)) {
    M.Modal.init(modal);
  }

  try {
    M.Modal.getInstance(modal).open();
  } catch (error) {
    console.error(`Error opening modal "${modalId}":`, error);
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    console.error(`Modal with ID "${modalId}" not found.`);
    return;
  }

  try {
    M.Modal.getInstance(modal).close();
  } catch (error) {
    console.error(`Error closing modal "${modalId}":`, error);
  }
}





// export function openModal(modalId) {
//   const modal = document.getElementById(modalId);

//   if (!modal) {
//     console.error(`Modal with ID "${modalId}" not found.`); // Handle error
//     return; // Exit function to prevent further errors
//   }

//   try {
//     M.Modal.getInstance(modal).open();
//   } catch (error) {
//     console.error(`Error opening modal "${modalId}":`, error); // Handle modal library error
//   }
// }

// export function closeModal(modalId) {
//   const modal = document.getElementById(modalId);

//   if (!modal) {
//     console.error(`Modal with ID "${modalId}" not found.`);
//     return;
//   }

//   try {
//     M.Modal.getInstance(modal).close();
//   } catch (error) {
//     console.error(`Error closing modal "${modalId}":`, error);
//   }
// }



// export function openModal(modalId) {
//     const modal = document.getElementById(ModalId);
//     M.Modal.getInstance(modal).open();
// }

// export function closeModal(modalId) {
//   const modal = document.getElementById(ModalId);
//   M.Modal.getInstance(modal).close();
// }

