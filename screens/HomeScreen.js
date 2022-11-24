import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,StatusBar, RefreshControl } from 'react-native'
import React, { useContext, useEffect } from 'react'
// import { getAuth, signOut, GoogleAuthProvider,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { auth } from '../firebase';
import NavBar from '../components/NavBar';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import {colors, shadow, sizes, spacing, STATUS_BAR_HEIGHT} from '../constants/theme';
import { TOP_PLACES, PLACES } from '../data';
import RecentList from '../components/RecentList';
import SectionHeader from '../components/SectionHeader';
import AddOverlayButton from '../components/AddOverlayButton';
import { DataContext } from '../contexts/DataContext';


const HomeScreen = ({ navigation }) => {
  const {dishesDataByRating, fetchDishesDataByRating, dishesDataByRecent, fetchDishesDataByRecent} = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    onRefresh()
  }, [])


  const onRefresh = React.useCallback(() => {
    // By Rating
    setRefreshing(true);
    fetchDishesDataByRating().then(() => 
    {
      setRefreshing(false)
    }).catch((error) => alert(error))
    // By Recent
    fetchDishesDataByRecent().then(() => 
    {
      setRefreshing(false)
    }).catch((error) => alert(error))
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <NavBar />
        <View style={styles.contentContainer}>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            >
              <Text style={styles.heading1}>Your Top Dishes</Text>
              <TopPlacesCarousel list={dishesDataByRating}/>
              <SectionHeader
                title="Recent Updates"
                buttonTitle="See All"
                onPress={() => {}}
              />
              <RecentList list={dishesDataByRecent} />
          </ScrollView>
        </View>
        <AddOverlayButton />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer : {
    flex: 10
  },
  heading1 : {
    fontSize: sizes.title,
    fontWeight: 'bold',
    marginLeft: spacing.l,
    color: colors.black
  }

})