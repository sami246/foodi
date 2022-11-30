import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,StatusBar, RefreshControl, ActivityIndicator } from 'react-native'
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
import AppLoader from '../components/AppLoader'
import GridDisplay from '../components/Displays/GridDisplay';


const HomeScreen = ({ navigation }) => {
  const {dishesDataByRating, fetchDishesDataByRating, dishesDataByRecent, fetchDishesDataByRecent, isLoading} = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    onRefresh()
  }, [])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    // By Rating
    setRefreshing(true);
    wait(2000).then(() => {
      fetchDishesDataByRating()
      fetchDishesDataByRecent()
    })
    .then(() => 
    {
      setRefreshing(false)
    }).catch((error) => alert(error))
  }, []);

 

  return (
    
    <SafeAreaView style={styles.container}>
      
        <StatusBar style="dark" />
        <NavBar refresh={false}/>
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
              {dishesDataByRating != false ?
                <TopPlacesCarousel list={dishesDataByRating}/>
              :
              <ActivityIndicator color={colors.orange} size={'large'} />
              }
              
              <SectionHeader
                title="Recent Updates"
                buttonTitle="See All"
                onPress={() => {navigation.navigate('Dishes')}}
              />
              {/* Should change to FlatList with GridDisplay */}
              {dishesDataByRecent != false ?
              <RecentList list={dishesDataByRecent} />
               :
               <ActivityIndicator color={colors.orange} size={'large'} />
               }
              
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