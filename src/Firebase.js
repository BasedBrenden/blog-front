// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLZjK4RwrjK52v1yDdvpMDyNK0reFQWlU",
  authDomain: "postly-image.firebaseapp.com",
  projectId: "postly-image",
  storageBucket: "postly-image.appspot.com",
  messagingSenderId: "763609124328",
  appId: "1:763609124328:web:813e8f49f0819b85a6a85d",
  measurementId: "G-JM582HWTV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)