import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'
import { getDatabase } from 'firebase/database';
import {getAuth,GoogleAuthProvider } from "firebase/auth"
import { getStorage } from 'firebase/storage';




const firebaseConfig = {
    apiKey: "AIzaSyCXNSJy7FQRrRNKIbFmGujMFAZR-BBxXpg",
    databaseURL: "https://test-54242-default-rtdb.firebaseio.com/",
    authDomain: "test-54242.firebaseapp.com",
    projectId: "test-54242",
    storageBucket: "test-54242.appspot.com",
    messagingSenderId: "832426473967",
    appId: "1:832426473967:web:33cb636719ee5f3da59e1a",
    measurementId: "G-95XVXTPSJX"
};


const dataUser = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebase.database();
export const app = dataUser
export const dataApp = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()
export default firebase