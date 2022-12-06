import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme'
import NavBar from '../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut} from "firebase/auth";
import { auth } from '../firebase';
import AppButton from '../components/SmallComponents/AppButton';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthProvider';


const SettingsScreen = ({ navigation }) => {
  const {numDishes} = useContext(DataContext);
  const {user} = useContext(AuthContext);

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

            <Text style={{fontSize: 40, fontWeight: '600'}}> Settings </Text>
            <View style={styles.infoLine}>
              <Text style={styles.infoText}>Email: </Text>
              <Text style={styles.infoText}> {user.email}</Text>
            </View>
            {user.displayName &&
            <View style={styles.infoLine}>
              <Text style={styles.infoText}>Name: </Text>
              <Text style={styles.infoText}> {user.displayName}</Text>
            </View>
                       }
            <View style={styles.infoLine}>
              <Text style={styles.infoText}>Number of Dishes: </Text>
              <Text style={styles.infoText}> {numDishes}</Text>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoText}>Number of Map Places: </Text>
              <Text style={styles.infoText}> sss 4</Text>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoText}>Account Created: </Text>
              <Text style={styles.infoText}>aaaa 01/11/2022</Text>
            </View>

            <View style={{alignItems: 'center', height: 60, marginTop: spacing.m}}>
              <AppButton 
              backgroundColor={colors.black}
              color={colors.white}
              // height={50}
              width={120}
              fontSize={15}
              icon={<Ionicons name='log-out-outline' size={25} color='white' />}
              title={'Log Out'}
              onPress={handleSignOut}
              buttonStyle={{alignItems: 'center'}}
              />
            </View>
            <View style={{alignItems: 'center', height: 60}}>
              <AppButton 
              backgroundColor={colors.red}
              color={colors.white}
              // height={50}
              width={160}
              fontSize={15}
              icon={<MaterialCommunityIcons name='account-remove-outline' size={25} color='white' />}
              title={'Delete Account'}
              onPress={() => alert("Delete Account")}
              buttonStyle={{alignItems: 'center'}}
              />
            </View>
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
    flex: 10,
    padding: 20
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.xs,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50
  },
  buttonText: {
      color: colors.light,
      alignItems: 'center' 
  },
  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: sizes.width - spacing.l,
    margin: spacing.s,
  },
  infoText: {
    flex: 1,
    fontSize: sizes.h3,
    fontWeight: '350',
  }
})
