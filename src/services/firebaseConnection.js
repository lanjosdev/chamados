// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBj_kv4kgRLSCmdAJbENEA0C4KGsj6LgJ0",
    authDomain: "sistema-chamados-5f8c8.firebaseapp.com",
    projectId: "sistema-chamados-5f8c8",
    storageBucket: "sistema-chamados-5f8c8.appspot.com",
    messagingSenderId: "128018062816",
    appId: "1:128018062816:web:c68cda1ff961998ed91f85",
    measurementId: "G-NRRGCCXKZD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exporta consts/funções:
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { auth, db, storage };