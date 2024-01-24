const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * Cloud function triggered upon new user signup. Creates a new user
 * document in the "users" collection.
 *
 * @param {FirebaseAuth.UserRecord} user - User record object.
 * @returns {Promise<FirebaseFirestore.WriteResult>} - Promise that
 * resolves when the user document is created.
 */
const newUserSignUp = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    transactions: [],
  });
});

/**
 * Cloud function triggered when a user is deleted. Deletes the user's
 * document from the "users" collection.
 *
 * @param {FirebaseAuth.UserRecord} user - User record object.
 * @returns {Promise<FirebaseFirestore.WriteResult>} - Promise that
 * resolves when the user document is deleted.
 */
const userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

/**
 * Validates transaction data, ensuring it meets expected criteria.
 *
 * @param {Object} data - Object containing transaction details to be validated.
 * @throws {functions.https.HttpsError} - Throws an error if
 * invalid data is encountered.
 */
function validateTransactionData(data) {
  const maxTextLength = 500;
  if (data.companyPersonName && data.companyPersonName.length > maxTextLength) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Company/Person Name cannot be more than 500 characters long",
    );
  }
  if (data.description && data.description.length > maxTextLength) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Description cannot be more than 500 characters long",
    );
  }
  if (typeof data.amount !== "number") {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Amount must be a number",
    );
  }
}

/**
 * Callable function to add a new transaction to the Firestore database.
 *
 * @param {Object} data - Object containing transaction details.
 * @param {FirebaseFunctions.Context} context - Firebase Functions
 * context object.
 * @returns {Promise<Object>} - Promise resolving with transaction
 * details or error message.
 */
const addTransaction = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add transactions",
    );
  }

  validateTransactionData(data);

  try {
    const transactionRef = await admin.firestore().collection(
        "transactions").add({
      companyPersonName: data.companyPersonName,
      description: data.description,
      transactionType: data.transactionType,
      amount: data.amount,
    });
    return {result: `Transaction added with ID: ${transactionRef.id}`};
  } catch (error) {
    throw new functions.https.HttpsError(
        "unknown",
        "Failed to add transaction",
        error.message,
    );
  }
});

module.exports = {
  newUserSignUp,
  userDeleted,
  addTransaction,
};
