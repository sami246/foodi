import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Pressable, Image } from 'react-native'
import React, { useEffect} from 'react'
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme'
import { auth } from '../firebase';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from '../components/NavBar';


const MapScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    if (user !== null) {
      console.log({user})

    }
  }, [])


  return (
    <SafeAreaView style={styles.container}>
        <NavBar bgColor={colors.blue}/>
        <View style={styles.contentContainer}>
          <Text style={{fontSize: sizes.h1, fontWeight: '800'}}>MAP SCREEN</Text>
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
          </Pressable>
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