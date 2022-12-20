import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import NavBar from '../components/NavBar';
import DishList from '../components/DishList';
import AddOverlayButton from '../components/SmallComponents/AddOverlayButton';
import { DataContext } from '../contexts/DataContext';
import { colors, NAV_BAR_HEIGHT, sizes, spacing } from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import TagsModal from '../components/Modal/TagsModal';
import { dummydata } from '../data/Foodi Dummy';
import SortModal from '../components/Modal/SortModal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

const DishesScreen = ({ navigation, route }) => {
  const {dishesData,setDishesData, fetchDishesData, sortFilter, setSortFilter, wouldHaveAgainFilter, setWouldHaveAgainFilter, tagsFilter, setTagsFilter} = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [display, setDisplay] = useState('two')
  const [modalVisible, setModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  // dishesData.forEach((dish) => {if(dish.id === '84SEpzGj2T6dvHRaUFq0'){console.log("Rating----", dish.rating)}});
  // filteredData?.forEach((dish) => {if(dish.id === '84SEpzGj2T6dvHRaUFq0'){console.log("Rating F----", dish.rating)}});

  useEffect(() => {
    onRefresh();
    
  }, [])

  useEffect(() => {
    if(route?.params?.tag){
      console.log("Entered with Params")
      console.log(route?.params?.tag)
      setTagsFilter(route?.params?.tag);
    }
  }, [route?.params?.tag])

  useEffect(() => {
    if(route?.params?.sentFilter){
      console.log("Entered with sent filter Params")
      console.log(route?.params?.sentFilter)
      setSortFilter(route?.params?.sentFilter);
    }
  }, [route?.params?.sentFilter])

  useEffect(() => {
    var dataSource = dishesData
    if (search){
      const textData = search.toUpperCase();
      setFilteredData(dataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1);
      }))
    }
    else{
        setFilteredData(dishesData)
      }
  }, [search, dishesData])

  const handleWouldHaveAgain = () => {
      setWouldHaveAgainFilter((previousState) => !previousState);
  }

  useEffect(() => {
    console.log("sort", sortFilter, "tags", tagsFilter, "wha", wouldHaveAgainFilter)
    fetchDishesData();
  }, [wouldHaveAgainFilter, sortFilter, tagsFilter])


  const handleSort = () => {
    console.log("Sort Pressed")
    // setSortFilter({
    //   name: 'rating',
    //   direction: 'desc'
    // })
    setSortModalVisible(true)
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {fetchDishesData().then(() => {
      setRefreshing(false)
    }).catch((error) => alert(error))})

  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
        <NavBar refresh={true} onRefresh={onRefresh} refreshing={refreshing}/>
        <View style={styles.contentContainer}>
        
          <View style={{alignItems:'center', marginVertical: 2, width: '100%', }}>
                <TextInput
                    placeholder='Search Dish Name or Restaurant'
                    value={search}
                    style={styles.input} 
                    onChangeText = { text => setSearch(text)}
          />
          </View>
          <View style={{alignItems:'center', marginVertical: 3, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
              <View style={{alignItems:'center', flexDirection: 'row'}}>
                    <Pressable style={[styles.smallButton, {flexDirection: 'row', alignItems: 'center', paddingRight: 8, backgroundColor: tagsFilter ? colors.gold : colors.white}]}
                    onPress={() => setModalVisible(true)}
                    >
                      <MaterialCommunityIcons name='filter' size={20} color={tagsFilter ? colors.white : colors.darkGray} />
                      <Text style={{color: tagsFilter ? colors.white : colors.darkGray, fontWeight: tagsFilter ? '500' : 'normal'}}> Filter</Text>
                      <TagsModal modalVisible={modalVisible} setModalVisible={setModalVisible} tags={tagsFilter} setTags={setTagsFilter} showButton={false}/>
                    </Pressable>
                    <Pressable style={[styles.smallButton, {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, backgroundColor: sortFilter ? colors.blue : colors.white}]}
                    onPress={() => handleSort()}
                    >
                      {sortFilter ? 
                      <FontAwesome5 name={sortFilter.direction === 'desc' ? 'sort-amount-down' : 'sort-amount-up'} size={17} color={colors.white} style={{paddingRight: 3}}/>
                      : 
                      <MaterialCommunityIcons name='sort' size={20} color={sortFilter ? colors.white : colors.darkGray} />
                      }
                      
                      <Text style={{ textTransform: "capitalize", color: sortFilter ? colors.white : colors.primary, fontWeight: sortFilter ? '500' : 'normal'}}> {sortFilter ? sortFilter.name : "Sort By"}</Text>
                      <SortModal modalVisible={sortModalVisible} setModalVisible={setSortModalVisible} sortFilter={sortFilter} setSortFilter={setSortFilter}/>
                    </Pressable>
                    <Pressable style={[styles.smallButton, {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, backgroundColor: wouldHaveAgainFilter ? colors.green : colors.white}]}
                    onPress={() => handleWouldHaveAgain()}
                    >
                      <MaterialCommunityIcons name='repeat' size={20} color={wouldHaveAgainFilter ? colors.white : colors.darkGray} />
                    </Pressable>
                    {(sortFilter || wouldHaveAgainFilter || tagsFilter) && 
                    <Pressable style={[styles.smallButton, {backgroundColor: colors.black}]} onPress={() => {
                        setSortFilter(null)
                        setWouldHaveAgainFilter(false)
                        setTagsFilter(null)
                    }}>
                      <Ionicons name='close' size={20} color={colors.white} />
                    </Pressable>
                    }
              </View>
              <View style={{alignItems:'center', flexDirection: 'row'}}>
                    <MaterialCommunityIcons style={[styles.smallButton, {backgroundColor: display === 'one' ? colors.lightOrange : colors.white}]}
                    name='view-day' size={22} color={display === 'one' ? colors.white : colors.darkGray} 
                    onPress={() => {
                      setDisplay('one')
                    }}/>
                    <MaterialCommunityIcons style={[styles.smallButton, {backgroundColor: display === 'two' ? colors.lightOrange : colors.white}]}
                    name='view-grid' size={22} color={display === 'two' ? colors.white : colors.darkGray} 
                    onPress={() => {
                      setDisplay('two')
                    }}/>
                    <MaterialCommunityIcons style={[styles.smallButton, {backgroundColor: display === 'three' ? colors.lightOrange : colors.white}]}
                    name='view-parallel' size={22} color={display === 'three' ? colors.white : colors.darkGray} 
                    onPress={() => {
                      setDisplay('three')
                    }}/>
              </View>
          </View>
            {/* {refreshing && <ActivityIndicator color={colors.orange} size={'large'}/>} */}
            {dishesData || dishesData != []
            ? 
            <DishList list={filteredData === null? dishesData : filteredData} display={display} filterTags={tagsFilter} setFilterTags={setTagsFilter} refreshing={refreshing} onRefresh={onRefresh}/> 
            : 
            <TouchableOpacity style={styles.emptyBox} onPress={() => {navigation.navigate('Add Dish')}}>

                <FontAwesome5 name='plus' size={20} color={colors.lightGray} style={{alignSelf: 'center', marginBottom: 10}}/>
                <Text style={{color: colors.lightGray, alignSelf: 'center', fontSize: 16, fontWeight: '500'}}> Add a Dish </Text>

            </TouchableOpacity>
            }
            {/* {isEmpty(filteredData) && 
            <View style={{alignSelf:'center', backgroundColor: 'red', flex: 2}}>
            <Text>No Dishes Matching Your Search.</Text>
            </View>} */}
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
    flex: 1,
    height: sizes.height - NAV_BAR_HEIGHT,
    width: sizes.width,
    alignItems: 'center'
  },
  emptyBox:{
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    justifyContent: 'center', borderWidth: 3, borderColor: colors.lightGray, borderStyle: 'dashed',
    overflow: 'hidden',
    width: 300,
    height: 150,
    top: 50
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
smallButton: {
  backgroundColor: colors.white,
  paddingHorizontal: 3,
  paddingVertical: 4,
  borderRadius: 10,
  borderWidth: 0.5,
  borderColor: colors.gray,
  marginHorizontal: 2 }
})