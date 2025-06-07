const admin = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY ? 
    process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

// Validate required configuration
if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
  throw new Error('Missing required Firebase Admin configuration. Check your environment variables.');
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  throw error;
}

module.exports = admin; 