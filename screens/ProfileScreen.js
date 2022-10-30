import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { STATUS_BAR_HEIGHT } from '../constants/theme'


const ProfileScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
        <Text> Profile </Text>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: STATUS_BAR_HEIGHT,
  },
  contentContainer : {
    flex: 10
  },
})