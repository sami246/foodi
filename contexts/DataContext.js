import React, {createContext, useState, useContext} from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { collection, query, where, getDocs, onSnapshot  } from "firebase/firestore";
import { auth, firestoreDB } from '../firebase';
    


export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [dishesData, setDishesData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        dishesData,
        setDishesData,
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
      }}>
      {children}
    </DataContext.Provider>
  );
};