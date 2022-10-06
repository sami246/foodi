import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
// import { getAuth, signOut, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { auth } from '../firebase';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts';



const HomeScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>
        <NavBar />
        <View style={{flex: 10, backgroundColor: 'gray'}}>
            <Text>THIS IS WHERE ALL THE CONTENT GOES </Text>

        </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
  },

})