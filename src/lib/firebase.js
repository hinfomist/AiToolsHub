import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzLlTiXgudODUFnrjQoKre6i-fSvWzzyk",
  authDomain: "ai-tool-finder-fb502.firebaseapp.com",
  projectId: "ai-tool-finder-fb502",
  // Use the correct bucket format for Firebase Storage
  storageBucket: "ai-tool-finder-fb502.appspot.com",
  messagingSenderId: "393046093087",
  appId: "1:393046093087:web:01317b337d6c34b707142a",
  measurementId: "G-0M3TNWHVRY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enable offline persistence for better reliability
try {
  // This will enable offline support for Firestore
  db.settings = {
    cacheSizeBytes: 40 * 1024 * 1024, // 40MB cache
  };
} catch (error) {
  console.warn('Could not enable offline persistence:', error);
}

export default app;