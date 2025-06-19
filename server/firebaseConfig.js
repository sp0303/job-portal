const admin = require('firebase-admin');

// Initialize only if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require('./serviceAccountKey.json'); // or use env vars
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
}

const db = admin.firestore();

module.exports = { admin, db };