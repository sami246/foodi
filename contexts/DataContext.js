import React, {createContext, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { collection, query, where, onSnapshot, orderBy, limit, getDoc, doc,  } from "firebase/firestore";
import { firestoreDB } from '../firebase';
  
export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [dishesData, setDishesData] = useState([]);
    const [dishesDataByRating, setdishesDataByRating] = useState(false);
    const [dishesDataByRecent, setdishesDataByRecent] = useState(false);
    

  return (
    <DataContext.Provider
      value={{
        dishesData,
        setDishesData,
        dishesDataByRating,
        dishesDataByRecent,
        fetchDishesData: async () => {
            try {
              const q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid));
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  var dishesDataTemp = []
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if (!(doc.id in dishesDataTemp)){
                        dishesDataTemp.push({ ...doc.data(), id: doc.id, key: doc.id})
                    }
                  });
                  setDishesData(dishesDataTemp)
              });
              return unsubscribe;
            }
            catch (error) {
              console.log(error)
            }
          },
          fetchRestaurantData: async (id) => {
            try {
              const docRef  = doc(firestoreDB, "restaurants", id);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                return docSnap.data();
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return null
              }
            }
            catch (error) {
              console.log(error)
            }
          },
          fetchDishesDataByRating: async () => {
            try {
              const q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid), orderBy("rating", "desc"), limit(5))
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  var dishesDataTemp = []
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                      dishesDataTemp.push({ ...doc.data(), id: doc.id, key: doc.id})                   
                  });
                  setdishesDataByRating(dishesDataTemp)
              });
              return unsubscribe;
            }
            catch (error) {
              console.log(error)
            }
          },
          fetchDishesDataByRecent: async () => {
            try {
              const q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid), orderBy("updatedTime", "desc"), limit(4))
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  var dishesDataTemp = []
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if (!(doc.id in dishesDataTemp)){
                        dishesDataTemp.push({ ...doc.data(), id: doc.id, key: doc.id})
                    }
                  });
                  setdishesDataByRecent(dishesDataTemp)
              });
              return unsubscribe;
            }
            catch (error) {
              console.log("fetch", error)
            }
          },
          firebaseTimetoString: (time) => {
            var time2 = time.toDate()
            return `${time2.getDate()}/${time2.getMonth()}/${time2.getFullYear()}`
          },
          handlePlaceholder: () => {
            var randomNumber = Math.floor(Math.random() * 5)
            if (randomNumber === 0){
              return require(`../assets/place-holders/image-placeholder-red.png`) 
            }
            else if (randomNumber === 1) {
              return require(`../assets/place-holders/image-placeholder-orange.png`) 
            }
            else if(randomNumber === 2){
              return require(`../assets/place-holders/image-placeholder-gold.png`) 
            }
            else if(randomNumber === 3){
              return require(`../assets/place-holders/image-placeholder-blue.png`) 
            }
            else if(randomNumber === 4){
              return require(`../assets/place-holders/image-placeholder-green.png`) 
            }
          }
      }}>
      {children}
    </DataContext.Provider>
  );
};