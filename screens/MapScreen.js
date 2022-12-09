import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Pressable, Image } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme'
import { auth } from '../firebase';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from '../components/NavBar';
import { Gooogle_API_Key } from '../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { collection, query, where, onSnapshot, orderBy, limit, getDoc, doc,  } from "firebase/firestore";
import { firestoreDB } from '../firebase';


const MapScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser)
  const [data, setData] = useState(null)
  const ref = useRef();

  useEffect(() => {
    // test();
    ref.current?.getAddressText();
  }, []);

  const handlePlaces = (obj, obj2) => {
    setData(obj)
    // console.log(JSON.stringify(obj, null, 3));
    console.log(JSON.stringify(obj2, null, 3));
  }
  

  // const test = () => {
  //   const dishes = collection(firestoreDB, "dishs")

  //   const rating = true
  //   let r = ''
  //   if (rating) {
  //     r = orderBy('rating', 'desc')
  //   } 
  //   const q = query(dishes, where("userId", "==", user.uid), r);
  //         // const q = query(dishes, where("userId", "==", user.uid), r, limit(3));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     var dishesDataTemp = []
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.data().rating)
  //       dishesDataTemp.push({ ...doc.data(), id: doc.id, key: doc.id})
  //     });
  //     console.log({dishesDataTemp});
  //     setData(dishesDataTemp);
  //     return unsubscribe
  // });
  // }


  return (
    <SafeAreaView style={styles.container}>
        <NavBar bgColor={colors.blue} fontColor={colors.white}/>
        <View style={styles.contentContainer}>
          <Text style={{fontSize: sizes.h1, fontWeight: '800'}}>MAP SCREEN</Text>

          <View>
            {data?.map((item) => {
              <Text>{item.dishName}</Text>
            })}
          </View>
        </View>
    </SafeAreaView>
  )
}

export default MapScreen

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