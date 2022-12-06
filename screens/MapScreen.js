import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Pressable, Image } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme'
import { auth } from '../firebase';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from '../components/NavBar';
import { Gooogle_API_Key } from '../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


const MapScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser)
  const [data, setData] = useState(null)
  const ref = useRef();

  useEffect(() => {
    ref.current?.getAddressText();
  }, []);

  const handlePlaces = (obj, obj2) => {
    setData(obj)
    // console.log(JSON.stringify(obj, null, 3));
    console.log(JSON.stringify(obj2, null, 3));
  }


  return (
    <SafeAreaView style={styles.container}>
        <NavBar bgColor={colors.blue}/>
        <View style={styles.contentContainer}>
          {/* <Text style={{fontSize: sizes.h1, fontWeight: '800'}}>MAP SCREEN</Text>
          <Text>{user.displayName} </Text>
          <Text>{user.email} </Text>
          <Text>{user.photoURL} </Text>
          <Text>{user.emailVerified} </Text>
          <Text>UID: {user.uid} </Text>
          <Text>Created at: {user.metadata.creationTime} </Text>
          <Text>Last Sign in Time: {user.metadata.lastSignInTime} </Text>
          <Pressable>
                      <Image 
                      source={{ uri: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' }}
                      style={{ width: sizes.width - spacing.xl - spacing.s, height: 230, overflow: 'hidden', resizeMode: 'center' }} 
                      
                      />
          </Pressable> */}
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