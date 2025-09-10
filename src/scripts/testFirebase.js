// Test Firebase connectivity
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test read operation
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Firebase Firestore connection successful');
    console.log('Documents in test collection:', snapshot.size);
    
    // Test write operation
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Test document',
        timestamp: new Date()
      });
      console.log('✅ Firebase write operation successful, doc ID:', docRef.id);
    } catch (writeError) {
      console.error('❌ Firebase write failed:', writeError.message);
      if (writeError.code === 'permission-denied') {
        console.log('💡 You need to update your Firebase Security Rules to allow writes');
      }
    }
    
  } catch (error) {
    console.error('❌ Firebase connection failed:', error.message);
    console.log('💡 Please check:');
    console.log('1. Firebase project configuration');
    console.log('2. Internet connection');
    console.log('3. Firebase Security Rules');
  }
};

// Run the test
testFirebaseConnection();