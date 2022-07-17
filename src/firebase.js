import {initializeApp} from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyClXV_rfBjaRlXaTqe_sUfgbCFna15T-Ls",
  authDomain: "friend-matching-itss.firebaseapp.com",
  projectId: "friend-matching-itss",
  storageBucket: "friend-matching-itss.appspot.com",
  messagingSenderId: "812414362834",
  appId: "1:812414362834:web:38dcee3e27dd804173f90b",
  measurementId: "G-97S2THRTWT",
  databaseURL: "https://friend-matching-itss-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);

export default firebaseApp
