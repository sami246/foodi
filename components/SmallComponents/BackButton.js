import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/theme';

const BackButton = ({iconColor}) => {
  const navigation = useNavigation();

  return (
    <Pressable style={{position: 'absolute', zIndex: 1, top: 0, left: 0, padding: 15}} onPress={() => {navigation.goBack()}}>
        <MaterialIcons name='arrow-back-ios' size={27} color={iconColor} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({})