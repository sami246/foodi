import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Pressable } from 'react-native'
import React from 'react'
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme'
import NavBar from '../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOut} from "firebase/auth";
import { auth } from '../firebase';


const SettingsScreen = ({ navigation }) => {
  function handleSignOut(){
    signOut(auth).then(() => {
      navigation.replace('Login')
    }).catch((error) => {
      alert(error.message)
    });
}

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <View style={styles.contentContainer}>
            <Text> Settings </Text>
            <Pressable style={styles.button} onPress={handleSignOut}>
                <Ionicons name='log-out-outline' size={25} color='white' />
            </Pressable>
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
  },
  contentContainer : {
    flex: 10
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
