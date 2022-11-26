import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import NavBar from '../components/NavBar';
import DishList from '../components/DishList';
import AddOverlayButton from '../components/AddOverlayButton';
import { DataContext } from '../contexts/DataContext';
import { colors, sizes } from '../constants/theme';

const DishesScreen = ({ navigation }) => {
  const {dishesData,setDishesData, fetchDishesData, isLoading, setIsLoading} = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState(null)
  const [filteredData, setFilteredData] = useState(null)

  useEffect(() => {
    onRefresh()
  }, [])

  const handleSearch = (search) => {
    
    setSearch(search)
    if(search){
      search.toLowerCase()
      setFilteredData(dishesData.filter(item => item.dishName?.includes(search) || item.restaurant?.includes(search) ))
    }
    else{
      setFilteredData(dishesData)
    }

  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDishesData().then(() => {
      setIsLoading(false)
      setRefreshing(false)
    }).catch((error) => alert(error))
    
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
        <NavBar refresh={true} onRefresh={onRefresh}/>
        <View style={styles.contentContainer}>
        {refreshing && <ActivityIndicator color={colors.orange} size={'large'}/>}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 2, width: '100%'}}>
                <TextInput
                    placeholder='Search'
                    value={search}
                    style={styles.input} 
                    onChangeText = { text => handleSearch(text)}
                />
          </View>
            {isLoading ? <ActivityIndicator color={colors.orange} size={'large'}/> : null}
            {dishesData
            ? 
            <DishList list={filteredData == null ? dishesData : filteredData} /> 

            : 
            <Text style={{fontSize: 20}}>Add some posts</Text>
            }
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
    flex: 10,
    width: sizes.width,
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    borderWidth: 0.5,
    borderColor: colors.gray
},

})