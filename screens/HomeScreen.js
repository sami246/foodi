import { StyleSheet, Text, View, ScrollView, SafeAreaView,StatusBar, RefreshControl, ActivityIndicator, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import NavBar from '../components/NavBar';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import {colors, sizes, spacing} from '../constants/theme';
import RecentList from '../components/RecentList';
import SectionHeader from '../components/SectionHeader';
import AddOverlayButton from '../components/SmallComponents/AddOverlayButton';
import { DataContext } from '../contexts/DataContext';
import WantToGoList from '../components/WantToGoList';
import RandomPlace from '../components/RandomPlace';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({ navigation }) => {
  const {dishesDataByRating, fetchDishesDataByRating, dishesDataByRecent, fetchDishesDataByRecent, isLoading, fetchRestaurantDataByRecent, restaurantDataByRecent} = useContext(DataContext);
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
      fetchRestaurantDataByRecent()
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
              <Pressable onPress={() => {navigation.navigate('Dishes')}}>
              <Text style={[styles.titles, {marginTop: 5, marginBottom: 0, marginLeft: spacing.l,}]}>Your Top Dishes</Text>
              </Pressable>
              {dishesDataByRating != false ?
                <TopPlacesCarousel list={dishesDataByRating}/>
              :
              <ActivityIndicator color={colors.orange} size={'large'} />
              }
              {/* TODO: Add a random generated restaurant for user to visit from list of want to go */}
              <View style={styles.randomTitleBox}>
                <Text style={styles.titles}>Random Pick to try out!</Text>
                <Pressable onPress={() => {onRefresh()}}> 
                  <FontAwesome name='refresh' size={26} color={refreshing ? colors.orange : colors.primary} style={{padding: 0}}/>
                </Pressable>
              </View>
              
              <RandomPlace />
              <SectionHeader
                title="Recently Eaten"
                buttonTitle="See All"
                onPress={() => {navigation.navigate('Dishes', {sentFilter: {name: 'date', direction: 'desc'}})}}
              />
              {/* Should change to FlatList with GridDisplay */}
              {dishesDataByRecent != false ?
              <RecentList list={dishesDataByRecent} />
               :
               <ActivityIndicator color={colors.orange} size={'large'} />
               }
              <SectionHeader
                title="Recently Wanted to Go"
                buttonTitle="See All"
                // TODO Change NAv to want to go list
                onPress={() => {navigation.navigate('Dishes', {sentFilter: {name: 'date', direction: 'desc'}})}}
              />
              {restaurantDataByRecent != false ?
              <WantToGoList list={restaurantDataByRecent} />
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
  titles: {
    fontSize: sizes.h3 + 4,
    fontWeight: 'bold',
  },
  randomTitleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: spacing.l,
    marginRight: spacing.m,
    marginTop: spacing.s,
    marginBottom: spacing.s,
  }

})