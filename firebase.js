import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    name: "fire_base_auth_test",
    apiKey: "AIzaSyARRcgerLjLUzQOz7l7mG0SJExGnAF4mp8",
    authDomain: "fire-base-auth-276cc.firebaseapp.com",
    projectId: "fire-base-auth-276cc",
    storageBucket: "fire-base-auth-276cc.appspot.com",
    messagingSenderId: "325079120900",
    appId: "1:325079120900:web:376146e10166d9c2d0c951",
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };