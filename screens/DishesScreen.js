import { StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import NavBar from '../components/NavBar';
import DishList from '../components/DishList';
import AddOverlayButton from '../components/AddOverlayButton';
import { DataContext } from '../contexts/DataContext';

export 
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const DishesScreen = ({ navigation }) => {
  const {dishesData,setDishesData, fetchDishesData} = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    onRefresh()
  }, [])


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDishesData().then(() => 
    {
      setRefreshing(false)
    }).catch((error) => alert(error))
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
                  <View>
                    <Text>Filter</Text>
                    <Text>Search</Text>
                    <Text>Tags</Text>
                  </View>
                    {dishesData
                    ? 
                    <View>
                      <DishList list={dishesData} /> 
                    <Text>JMMM</Text>
                    </View>
                    : 
                    <Text style={{fontSize: 20}}>Add some posts</Text>
                    }
          </ScrollView>
        </View>
        <AddOverlayButton />
    </SafeAreaView>
  )
}

export default DishesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer : {
    flex: 10
  },

})