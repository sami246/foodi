import { StyleSheet, View, Text, Image, PermissionsAndroid, Alert, Button, Location } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { colors, sizes, STATUS_BAR_HEIGHT} from '../constants/theme'
import { auth } from '../firebase';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from '../components/NavBar';
import { Gooogle_API_Key } from '../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { collection, query, where, onSnapshot, orderBy, limit, getDoc, doc,  } from "firebase/firestore";
import { firestoreDB } from '../firebase';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


const MapScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser)
  const [data, setData] = useState(null)

  useEffect(() => {
    requestCameraPermission();
  
  }, [])
  
  
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        Alert("You cannot use map screen without granting permission!");
        requestCameraPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
    <MapView
      // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 51.537430,
        longitude: -0.125250,
        latitudeDelta: 0.125,
        longitudeDelta: 0.125,
      }}
      customMapStyle={[]}
      userInterfaceStyle='dark'
      showsUserLocation={true}
    >
      <Marker
        key={"1"}
        coordinate={{latitude: 51.537430,longitude: -0.125250}}
        title={"Marker"}
        description={"description"}
        // icon={require('../assets/foodIcons/dish-pin-icon.png')}
        onPress={() => {requestCameraPermission()}}
        >
                
            <Callout 
            tooltip
            style={styles.plainView}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Restaurant</Text>
                  <Text>Description</Text>
                  <Image 
                    style={styles.image}
                    source = {require('../assets/place-holders/image-placeholder-green.png')}
                  />
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </View>
            </Callout>
        </Marker>
    </MapView>
  </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  //Callout Bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5
  },
  name: {
    fontSize: 16,
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 80
  }

})