import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzLlTiXgudODUFnrjQoKre6i-fSvWzzyk",
  authDomain: "ai-tool-finder-fb502.firebaseapp.com",
  projectId: "ai-tool-finder-fb502",
  storageBucket: "ai-tool-finder-fb502.firebasestorage.app",
  messagingSenderId: "393046093087",
  appId: "1:393046093087:web:01317b337d6c34b707142a",
  measurementId: "G-0M3TNWHVRY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;