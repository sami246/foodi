import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { STATUS_BAR_HEIGHT } from '../constants/theme'

const SettingsScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <View style={styles.contentContainer}>
            <Text> Settings </Text>
            <Posts restaurant="Wendy's" />
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
