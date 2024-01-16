// @ts-check

// import { https } from 'firebase-functions';
// import { initializeApp } from 'firebase-admin/app';
// import { getAuth, getUserByEmail } from 'firebase-admin/auth';

// const admin = initializeApp();

// export const addAdminRole = https.onCall(async (data, context) => {
//   const auth = getAuth(admin);

//   if (!context.auth.token.admin) {
//     return { error: 'Only admins can add other admins' };
//   }

//   try {
//     const user = await getUserByEmail(auth, data.email);
//     await admin.auth().updateUser(user.uid, {
//       customClaims: { admin: true }
//     });
//     return { message: `Success! ${data.email} has been made an admin.` };
//   } catch (err) {
//     return { error: err.message };
//   }
// });

