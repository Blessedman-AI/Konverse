// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: 'beemhan-blog.firebaseapp.com',
  projectId: 'beemhan-blog',
  storageBucket: 'beemhan-blog.appspot.com',
  messagingSenderId: '233461927250',
  appId: '1:233461927250:web:ba4eda6a9d850193c1fe8b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
