import React, {createContext, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { collection, query, where, onSnapshot, orderBy, limit, getDoc, doc, startAt, endAt, getCountFromServer } from "firebase/firestore";
import { firestoreDB } from '../firebase';
import { dummyDishesDataByRating } from '../data';
import { dummydata } from '../data/FoodiDummy';
  
export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [dishesData, setDishesData] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [dishesDataByRating, setdishesDataByRating] = useState(false);
    const [dishesDataByRecent, setdishesDataByRecent] = useState(false);
    const [restaurantDataByRecent, setRestaurantDataByRecent] = useState(false);
    const [numDishes, setNumDishes] = useState(null);
    const [numRestaurants, setNumRestaurants] = useState(null);
    const [googlePlace, setGooglePlace] = useState(null)
    const [sortFilter, setSortFilter] = useState(null);
    const [wouldHaveAgainFilter, setWouldHaveAgainFilter] = useState(false);
    const [tagsFilter, setTagsFilter] = useState(null);
    const [mapFilterCategory, setMapFilterCategory] = useState(null); 
    // 1 = Want to go  2 = Already Been  3 = Favourite

    // const useDummyDishes = true
    const useDummyDishesByRating = true
    

  return (
    <DataContext.Provider
      value={{
        dishesData,
        setDishesData,
        mapData,
        setMapData,
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
        numRestaurants,
        setNumRestaurants,
        restaurantDataByRecent,
        setRestaurantDataByRecent,
        mapFilterCategory,
        setMapFilterCategory,
        handlePlaceholder: (color) => {
          if (color === "red"){
            return require(`../assets/place-holders/image-placeholder-red.png`) 
          }
          else if (color === "orange") {
            return require(`../assets/place-holders/image-placeholder-orange.png`) 
          }
          else if(color === "gold"){
            return require(`../assets/place-holders/image-placeholder-gold.png`) 
          }
          else if(color === "blue"){

            return require(`../assets/place-holders/image-placeholder-blue.png`) 
          }
          else if(color === "green"){
            return require(`../assets/place-holders/image-placeholder-green.png`) 
          }
        },
        fetchDishesData: async () => {
            try {
              let q = ''
              if(sortFilter){
                //sort.direction
                if(wouldHaveAgainFilter){
                    if(tagsFilter != null){
                        q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                        orderBy(sortFilter?.name, sortFilter?.direction && sortFilter?.direction),
                        where('tags', 'array-contains-any', tagsFilter),
                        where('wouldHaveAgain', '==', true));
                    }
                    else{
                        q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                        orderBy(sortFilter?.name, sortFilter?.direction),
                        where('wouldHaveAgain', '==', true));
                    }
                }
                else{
                  if(tagsFilter != null){
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    orderBy(sortFilter?.name, sortFilter?.direction),
                    where('tags', 'array-contains-any', tagsFilter))

                  }
                  else{
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    orderBy(sortFilter?.name, sortFilter?.direction))
                  } 
                }
              }
              else {
                if(wouldHaveAgainFilter){
                  if(tagsFilter != null){
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    where('tags', 'array-contains-any', tagsFilter),
                    where('wouldHaveAgain', '==', true));
                  }
                  else{
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    where('wouldHaveAgain', '==', true));
                  }
                }
                else{
                  if(tagsFilter != null){
                    q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid),
                    where('tags', 'array-contains-any', tagsFilter))
                  }
                  else{
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
              });
              return unsubscribe;
            }
            catch (error) {
              console.log("Fetch Data Error -->", error)
            }
          },
          fetchAllMapData: async () => {
            try {
              let q = ''
              if(mapFilterCategory != null){
                q = query(collection(firestoreDB, "users", user.uid, "restaurants"), where("category", "==", mapFilterCategory))
                }
              else{
                q = query(collection(firestoreDB, "users", user.uid, "restaurants"))
              }
              
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  var dishesDataTemp = []
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    dishesDataTemp.push({ ...doc.data(), id: doc.id, key: doc.id})

                  });
                  setMapData(dishesDataTemp)                 
              });
              return unsubscribe;
            }
            catch (error) {
              console.log("Fetch Data Error -->", error)
            }
          },
          fetchRestaurantData: async (id) => {
            // TODO change to get more info, not just set GooglePlace
            try {
              if(id){
                const docRef  = doc(firestoreDB, "users", user.uid, "restaurants", id);
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
              if(useDummyDishesByRating){
                setdishesDataByRating(dummyDishesDataByRating)
              }
              else{
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
            }
            catch (error) {
              console.log("BY RATING ERROR", error)
            }
          },
          fetchCount: async () => {
            try{
              const dishes = collection(firestoreDB, "dishs");
              const dishesSnapshot = await getCountFromServer(dishes);
              setNumDishes(dishesSnapshot.data().count)

              const restaurants = collection(firestoreDB, "restaurants");
              const restaurantsSnapshot = await getCountFromServer(restaurants);
              setNumRestaurants(restaurantsSnapshot.data().count)
            }
            catch (error) {
              console.log("fetchCount", error)
            }
          },
          fetchDishesDataByRecent: async () => {
            try {
              const q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid), where("date", "!=", null), orderBy("date", "desc"), limit(5))
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
          fetchRestaurantDataByRecent: async () => {
            try {
              const q = query(collection(firestoreDB, "users", user.uid, "restaurants"),  where("category", "==", 1), orderBy("updatedDate", "desc"), limit(5))
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                  var dishesDataTemp = []
                  querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if (!(doc.id in dishesDataTemp)){
                        dishesDataTemp.push({ ...doc.data(), id: doc.id, key: doc.id})
                    }
                  });
                  setRestaurantDataByRecent(dishesDataTemp)
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

      }}>
      {children}
    </DataContext.Provider>
  );
};