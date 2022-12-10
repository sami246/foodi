import React, {createContext, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { collection, query, where, onSnapshot, orderBy, limit, getDoc, doc, startAt, endAt } from "firebase/firestore";
import { firestoreDB } from '../firebase';
  
export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [dishesData, setDishesData] = useState([]);
    const [dishesDataByRating, setdishesDataByRating] = useState(false);
    const [dishesDataByRecent, setdishesDataByRecent] = useState(false);
    const [numDishes, setNumDishes] = useState(null);
    const [googlePlace, setGooglePlace] = useState(null)
    const [sortFilter, setSortFilter] = useState(null);
    const [wouldHaveAgainFilter, setWouldHaveAgainFilter] = useState(false);
    const [tagsFilter, setTagsFilter] = useState(null)
    console.log("DataContext wouldHaveAgain --> ", wouldHaveAgainFilter)
    console.log("DataContext tagsFilter --> ", tagsFilter)
    console.log("DataContext sortFilter --> ", sortFilter)
    

  return (
    <DataContext.Provider
      value={{
        dishesData,
        setDishesData,
        dishesDataByRating,
        dishesDataByRecent,
        numDishes,
        setNumDishes,
        googlePlace,
        setGooglePlace,
        sortFilter,
        setSortFilter,
        wouldHaveAgainFilter,
        setWouldHaveAgainFilter,
        tagsFilter,
        setTagsFilter,
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
        },
        fetchDishesData: async () => {
            try {
              let q = ''
              console.log("sort", sortFilter, "tags", tagsFilter, "wha", wouldHaveAgainFilter)
              if(sortFilter){
                //sort.direction
                if(wouldHaveAgainFilter){
                    if(tagsFilter != null){
                        console.log("1")
                        q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                        orderBy(sortFilter?.name, sortFilter?.direction && sortFilter?.direction),
                        where('tags', 'array-contains-any', tagsFilter),
                        where('wouldHaveAgain', '==', true));
                    }
                    else{
                         console.log("2")
                        q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                        orderBy(sortFilter?.name, sortFilter?.direction),
                        where('wouldHaveAgain', '==', true));
                    }
                }
                else{
                  if(tagsFilter != null){
                    console.log("3")
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    orderBy(sortFilter?.name, sortFilter?.direction),
                    where('tags', 'array-contains-any', tagsFilter))

                  }
                  else{
                    console.log("4")
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    orderBy(sortFilter?.name, sortFilter?.direction))
                  } 
                }
              }
              else {
                if(wouldHaveAgainFilter){
                  if(tagsFilter != null){
                    console.log("5")
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    where('tags', 'array-contains-any', tagsFilter),
                    where('wouldHaveAgain', '==', true));
                  }
                  else{
                    console.log("6")
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    where('wouldHaveAgain', '==', true));
                  }
                }
                else{
                  if(tagsFilter != null){
                    console.log("7")
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    where('tags', 'array-contains-any', tagsFilter))
                  }
                  else{
                    console.log("8")
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid))
                  }   
                }
              }

              
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  var dishesDataTemp = []
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    dishesDataTemp.push({ ...doc.data(), id: doc.id, key: doc.id})

                  });
                  setDishesData(dishesDataTemp)
                  setNumDishes(dishesDataTemp.length)
              });
              return unsubscribe;
            }
            catch (error) {
              console.log("Fetch Data Error -->", error)
            }
          },
          fetchRestaurantData: async (id) => {
            try {
              if(id){
                const docRef  = doc(firestoreDB, "restaurants", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                  setGooglePlace(docSnap.data());
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                  setGooglePlace(null)
                }
              }
              else{
                setGooglePlace(null)
              }
            }
            catch (error) {
              console.log("ERROR", error)
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
              console.log("BY RATING ERROR", error)
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
          handleSort: async () => {
            console.log("Sort Pressed")
            await setSortFilter((previousState) => {
              if(previousState === null){
                return {name: "rating", direction: "desc"}
              }
              else{
                return null
              }
            })
          }

      }}>
      {children}
    </DataContext.Provider>
  );
};