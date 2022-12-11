import React from 'react'
import { StyleSheet, Text, View, Pressable  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {colors, NAV_BAR_HEIGHT, shadow, sizes, spacing} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const NavBar = ({refresh, onRefresh, bgColor, fontColor, refreshing}) => {
    const navigation = useNavigation();
    
    return (
        <View style={[styles.navContainer, {backgroundColor: bgColor ? bgColor : colors.lightOrange}]}>
            <Pressable onPress={() => navigation.navigate('Home')} android_ripple={{color: 'white'}} style={{padding: 5}}>
              <Text style={[styles.title, {color: fontColor}]} >Foodi</Text>
            </Pressable>
            {refresh && 
            <Pressable onPress={() => {onRefresh()}}> 
                <FontAwesome name='refresh' size={26} color={refreshing ? colors.white : colors.primary} style={{padding: 5}}/>

            </Pressable>
            }
        </View>
    )
  }

export default NavBar

const styles = StyleSheet.create({
    navContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: NAV_BAR_HEIGHT,
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