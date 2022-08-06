import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJ6OvQtU48aZfgX5iONBGXOgr2cBM5hCI",
  authDomain: "login-register-15a12.firebaseapp.com",
  projectId: "login-register-15a12",
  storageBucket: "login-register-15a12.appspot.com",
  messagingSenderId: "711182544612",
  appId: "1:711182544612:web:5006969a8c8dfd8f8dc6f1",
  databaseURL:
    "https://login-register-15a12-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
