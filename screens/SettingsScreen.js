import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { STATUS_BAR_HEIGHT } from '../constants/theme'
import NavBar from '../components/NavBar'

const SettingsScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <View style={styles.contentContainer}>
            <Text> Settings </Text>
        </View>
    </SafeAreaView>
  )
}

export default SettingsScreen

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
