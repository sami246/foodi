import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
// import { getAuth, signOut, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { auth } from '../firebase';
import NavBar from '../components/NavBar';
import Posts from '../components/Posts';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import {colors, shadow, sizes, spacing, STATUS_BAR_HEIGHT} from '../constants/theme';
import { TOP_PLACES, PLACES } from '../data';
import List from '../components/List';
import SectionHeader from '../components/SectionHeader';


const HomeScreen = ({ navigation }) => {
  

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <View style={styles.contentContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.heading1}>Your Top Dishes</Text>
              <TopPlacesCarousel list={TOP_PLACES}/>
              <SectionHeader
                title="Popular Trips"
                buttonTitle="See All"
                onPress={() => {}}
              />
              <List list={PLACES} />
          </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

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
  heading1 : {
    fontSize: sizes.title,
    fontWeight: 'bold',
    marginLeft: spacing.l,
    color: colors.primary
  }

})