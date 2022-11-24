import React, {createContext, useState} from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../contexts/AuthProvider';
import { collection, query, where, getDocs, onSnapshot  } from "firebase/firestore";
import { auth, firestoreDB } from '../firebase';
    


export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [dishesData, setDishesData] = useState([]);
    console.log("1", user)

  return (
    <DataContext.Provider
      value={{
        dishesData,
        setDishesData,
        loadDishesData: async () => {
            try {
              const user2  = auth.currentUser
              console.log("2", user2)
              const q = query(collection(firestoreDB, "dishs"), where("userId", "==", user2.uid));
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  var dishesDataTemp = []
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if (!(doc.id in dishesData)){
                      dishesData.push({ ...doc.data(), id: doc.id, key: doc.id})
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