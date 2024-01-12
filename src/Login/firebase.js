import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_6biELkMZhX6FybfRjsggaD24GaIEAYU",
  authDomain: "fir-user-reg-auth-c0c22.firebaseapp.com",
  projectId: "fir-user-reg-auth-c0c22",
  storageBucket: "fir-user-reg-auth-c0c22.appspot.com",
  messagingSenderId: "989305060953",
  appId: "1:989305060953:web:380b4e264c8fa79310fb48",
  measurementId: "G-69ZWFBWPKF"
};
const app = initializeApp(firebaseConfig);

// Récupération des instances d'authentification et de Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
