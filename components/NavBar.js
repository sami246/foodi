import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { signOut} from "firebase/auth";
import { auth } from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';


const NavBar = ({ navigation }) => {
    function handleSignOut(){
        signOut(auth).then(() => {
          navigation.navigate('Login')
        }).catch((error) => {
          alert(error.message)
        });
    }
    
    return (
        <View style={styles.navContainer}>

            <Text style={styles.title}>Foodi</Text>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Ionicons name='log-out-outline' size={30} color='white' />
            </TouchableOpacity>
        </View>
    )
  }

export default NavBar

const styles = StyleSheet.create({
    navContainer: {
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10,
      margin: 5,
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    title: {
      flex: 4,
      justifyContent: 'flex-start',
      color: 'blue',
      fontSize: 30,
      fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'blue',
        width: '10%',
        padding: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '70%'
      },
      buttonText: {
          color: 'white',
          fontWeight: '600',
          fontSize: 16,
          alignItems: 'center' 
      },
  
  })