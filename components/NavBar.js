import React from 'react'
import { StyleSheet, Text, View, Pressable  } from 'react-native'
import { signOut} from "firebase/auth";
import { auth } from '../firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';


const NavBar = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.navContainer}>
            <Pressable onPress={() => navigation.navigate('Home')} android_ripple={{color: 'white'}} style={{padding: 5}}>
              <Text style={styles.title} >Foodi</Text>
            </Pressable>
        </View>
    )
  }

export default NavBar

const styles = StyleSheet.create({
    navContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '7%',
      width: '100%',
      paddingHorizontal: 10,
      marginHorizontal: 5,
      alignItems: 'center',
      backgroundColor: colors.lightOrange,
    },
    title: {
      justifyContent: 'flex-start',
      color: colors.primary,
      fontSize: sizes.h1,
      fontWeight: 'bold'
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.xs,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
          color: colors.light,
          alignItems: 'center' 
      },
  
  })