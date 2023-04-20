// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF57fYxDoAwOdrxEZPqt9qi-KIXcp9m_E",
  authDomain: "menurestoran-6c4ba.firebaseapp.com",
  projectId: "menurestoran-6c4ba",
  storageBucket: "menurestoran-6c4ba.appspot.com",
  messagingSenderId: "878406039807",
  appId: "1:878406039807:web:952336e6051cb8345e74ca"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;