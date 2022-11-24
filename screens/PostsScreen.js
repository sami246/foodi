import { StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import NavBar from '../components/NavBar';
import PostList from '../components/PostList';
import AddOverlayButton from '../components/AddOverlayButton';
import { collection, query, where, getDocs, onSnapshot  } from "firebase/firestore";
import { auth, firestoreDB } from '../firebase';
import { DataContext } from '../contexts/DataContext';

export 
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const PostsScreen = ({ navigation }) => {
  const {dishesData,setDishesData, loadDishesData} = useContext(DataContext);

  useEffect(() => {
    loadDishesData()
  }, [])
  
  const [refreshing, setRefreshing] = React.useState(false);
  const [dishes, setDishes] = React.useState([]);

  const onRefresh = React.useCallback(() => {
    console.log({dishesData})
    setRefreshing(true);
    loadDishesData().then(() => setRefreshing(false)).catch((error) => alert(error))
  }, []);

  // const loadDishesData = async () => {
  //   try {
  //     const user  = auth.currentUser
  //     const q = query(collection(firestoreDB, "dishs"), where("userId", "==", user.uid));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //         var dishesData = []
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           if (!(doc.id in dishesData)){
  //             dishesData.push({ ...doc.data(), id: doc.id, key: doc.id})
  //           }
  //         });
  //         setDishes(dishesData)
  //     });
  //     return unsubscribe;
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <View style={styles.contentContainer}>
          <ScrollView 
              showsVerticalScrollIndicator={false}         
              refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />}
          >
                  <View>
                    <Text>Filter</Text>
                    <Text>Search</Text>
                    <Text>Tags</Text>
                  </View>
                    {dishes.length != 0 
                    ? 
                    <PostList list={dishes} /> 
                    : 
                    <Text style={{fontSize: 20}}>Add some posts</Text>
                    }
          </ScrollView>
        </View>
        <AddOverlayButton />
    </SafeAreaView>
  )
}

export default PostsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer : {
    flex: 10
  },

})