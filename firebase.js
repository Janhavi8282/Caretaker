// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfDK_vxkK0t0krv6QFGgTOe9rb19oXz1g",
  authDomain: "lifeshades-82e73.firebaseapp.com",
  projectId: "lifeshades-82e73",
  storageBucket: "lifeshades-82e73.appspot.com",
  messagingSenderId: "523046917612",
  appId: "1:523046917612:web:f4a54818985e2d83f21cc9"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app();
  }
  
  const db = app.firestore();
  const auth = firebase.auth();
  
  export { db, auth };