import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { documentId, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import 'firebase/storage'; 


const firebaseConfig = {
    apiKey: "AIzaSyAOarU5uFOgpRtJsPBk6qsHC3AEgaYYOLc",
    authDomain: "foodi-562d0.firebaseapp.com",
    projectId: "foodi-562d0",
    storageBucket: "foodi-562d0.appspot.com",
    messagingSenderId: "473160056235",
    appId: "1:473160056235:web:b926d3fc732ec2471226ee",
    measurementId: "G-FGFCB9TEGT"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getStorage(app);
export const firestoreDB = getFirestore(app);


const auth = getAuth(app);

export { auth };

import { collection, query, where, getDocs, onSnapshot  } from "firebase/firestore";

export var dishesData = []

const loadDishesData = async () => {
  try {
    const user  = auth.currentUser
    const q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          dishesData.push({ ...doc.data(), id: doc.id})
        });
    });

  }
  catch (error) {
    console.log(error)
  }
}

loadDishesData()

