// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCiXXft5V2l8HFuuuYqODMck-knb6imWnE",
    authDomain: "auth-9ca99.firebaseapp.com",
    projectId: "auth-9ca99",
    storageBucket: "auth-9ca99.appspot.com",
    messagingSenderId: "575437522996",
    appId: "1:575437522996:web:e5c3640e24346e67a76261",
    measurementId: "G-FDJ99DG5N1"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
const db = getFirestore(appFirebase)

export { db }

export default appFirebase