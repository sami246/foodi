import React, {createContext, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { firestoreDB } from '../firebase';
    


export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [dishesData, setDishesData] = useState([]);
    const [dishesDataByRating, setdishesDataByRating] = useState(false);
    const [dishesDataByRecent, setdishesDataByRecent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

  return (
    <DataContext.Provider
      value={{
        dishesData,
        setDishesData,
        dishesDataByRating,
        dishesDataByRecent,
        isLoading,
        setIsLoading,
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
      }}>
      {children}
    </DataContext.Provider>
  );
};