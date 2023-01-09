import { StyleSheet, Pressable, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/theme';

const BackButton = ({iconColor}) => {
  const navigation = useNavigation();

  return (
    <View style={{position: 'absolute', top: 0, left: 0, paddingLeft: 8, paddingTop: 5, elevation: 5, shadowColor: 'black'}}>
    <TouchableOpacity onPress={() => {navigation.goBack()}}>
        <Ionicons name='ios-arrow-back-circle-sharp' size={50} color={iconColor} style={{ zIndex: 1}}/>
        <View style={{backgroundColor: colors.white, width: 25, height: 25, position: 'absolute',
        top: 14,
        left: 10,}} />
    </TouchableOpacity>
    </View>
  )
}

export default BackButton

const styles = StyleSheet.create({})