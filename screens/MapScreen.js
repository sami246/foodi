import { StyleSheet, View, } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { colors} from '../constants/theme'
import { auth } from '../firebase';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from '../components/NavBar';
import { Gooogle_API_Key } from '../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { collection, query, where, onSnapshot, orderBy, limit, getDoc, doc,  } from "firebase/firestore";
import { firestoreDB } from '../firebase';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


const MapScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser)
  const [data, setData] = useState(null)


  return (
    // <SafeAreaView style={styles.container}>
    //     <NavBar bgColor={colors.blue} fontColor={colors.white}/>
    //     <View style={styles.contentContainer}>
    //       <Text style={{fontSize: sizes.h1, fontWeight: '800'}}>MAP SCREEN</Text>

    //       <View>
    //         {data?.map((item) => {
    //           <Text>{item.dishName}</Text>
    //         })}
    //       </View>
    //     </View>
    // </SafeAreaView>
    <View style={styles.container}>
    {/* <MapView
      // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView> */}
  </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  contentContainer : {
    flex: 10
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})