import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAx2gWAe2Wi__v4xtHIiIN9_1rtygeouTU",
  authDomain: "agilax-cb8da.firebaseapp.com",
  databaseURL: "https://agilax-cb8da-default-rtdb.firebaseio.com",
  projectId: "agilax-cb8da",
  storageBucket: "agilax-cb8da.firebasestorage.app",
  messagingSenderId: "658460474744",
  appId: "1:658460474744:web:f8b3e78faf8723b4c8dc8d",
  measurementId: "G-V8ZRLJWK9E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);