// src/services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * FIREBASE PROJECT CREDENTIALS
 * IMPORTANT: Replace these with your actual keys from the Firebase Console (Settings > Project Settings).
 * Keep these secret in a real production environment (e.g., using .env or Expo Secrets).
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "expensio-xxxx.firebaseapp.com",
  projectId: "expensio-xxxx",
  storageBucket: "expensio-xxxx.firebasestorage.app",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "x:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX"
};

// MOCK AUTH MODE
// Set this to true to test the app UI/Logic without a real Firebase project.
// It will automatically become 'false' once you replace "YOUR_API_KEY_HERE".
export const USE_MOCK_AUTH = firebaseConfig.apiKey === "YOUR_API_KEY_HERE";

// Initialize Firebase SDK or Mock
const app = initializeApp(firebaseConfig);

// Export Authentication instance
export const auth = getAuth(app);

export default app;
