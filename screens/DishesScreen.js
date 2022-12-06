import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, ActivityIndicator, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import NavBar from '../components/NavBar';
import DishList from '../components/DishList';
import AddOverlayButton from '../components/SmallComponents/AddOverlayButton';
import { DataContext } from '../contexts/DataContext';
import { colors, NAV_BAR_HEIGHT, sizes } from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import TagsModal from '../components/TagsModal';
import { isEmpty } from '@firebase/util';

const DishesScreen = ({ navigation, route }) => {
  const {dishesData,setDishesData, fetchDishesData, isLoading, setIsLoading} = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = useState(null)
  const [filterTags, setFilterTags] = useState([])
  const [filteredData, setFilteredData] = useState(null)
  const [display, setDisplay] = useState('two')
  const [modalVisible, setModalVisible] = useState(false);
  const [WHAFilter, setWHAFilter] = useState(false);




  useEffect(() => {
    onRefresh();
  }, [])

  useEffect(() => {
    if(route?.params?.tag){
      console.log(route?.params?.tag)
      setFilterTags(route?.params?.tag);
    }
  }, [route?.params?.tag])

  useEffect(() => {
    var dataSource = search ? filteredData : dishesData
    if(search && (!isEmpty(filterTags) && filterTags !== null)){
      setFilteredData(dataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const textData = search.toUpperCase();
        if(WHAFilter){
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1) && item.tags?.some(r=> filterTags.indexOf(r) >= 0) 
          && item.wouldHaveAgain;
        }else{
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1) && item.tags?.some(r=> filterTags.indexOf(r) >= 0);
        }
        
      }))
    }
    else if (search){
      setFilteredData(dataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const textData = search.toUpperCase();
        if(WHAFilter){
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1) 
          && item.wouldHaveAgain;
        }else{
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1);
        }
      }))
    }
    else if ((!isEmpty(filterTags) && filterTags !== null)){
        setFilteredData(dataSource.filter(function (item) {
          if(WHAFilter){
            return item.tags?.some(r=> filterTags.indexOf(r) >= 0) && item.wouldHaveAgain;
          }else{
            return item.tags?.some(r=> filterTags.indexOf(r) >= 0);
          }
        }))
    }
    else if (!isEmpty(dishesData)){
      if (WHAFilter){
        setFilteredData(dataSource.filter(function (item) {
          return item.wouldHaveAgain
        }))
      }else{
        setFilteredData(dishesData)
      }
    }

  }, [search, filterTags, WHAFilter])

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
                <Pressable style={[styles.smallButton, {flexDirection: 'row', alignItems: 'center', paddingRight: 8, backgroundColor: !isEmpty(filterTags) ? colors.gold : colors.white}]}
                onPress={() => setModalVisible(true)}
                >
                  <MaterialCommunityIcons name='filter' size={20} color={!isEmpty(filterTags) ? colors.white : colors.darkGray} />
                  <Text style={{color: !isEmpty(filterTags) ? colors.white : colors.darkGray}}> Filter</Text>
                  <TagsModal modalVisible={modalVisible} setModalVisible={setModalVisible} tags={filterTags} setTags={setFilterTags} showButton={false}/>
                </Pressable>
                <Pressable style={[styles.smallButton, {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8}]}
                onPress={() => {alert("Sort By")}}
                >
                  <MaterialCommunityIcons name='sort' size={20} color={colors.darkGray} />
                  <Text> Sort by</Text>
                </Pressable>
                <Pressable style={[styles.smallButton, {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, backgroundColor: WHAFilter ? colors.green : colors.white}]}
                onPress={() => {setWHAFilter((previousState) => !previousState);}}
                >
                  <MaterialCommunityIcons name='repeat' size={20} color={WHAFilter ? colors.white : colors.darkGray} />
                </Pressable>
              </View>
              <View style={{alignItems:'center', flexDirection: 'row'}}>
                <MaterialCommunityIcons style={[styles.smallButton, {backgroundColor: display === 'one' ? colors.lightOrange : colors.white}]}
                name='view-day' size={25} color={display === 'one' ? colors.white : colors.darkGray} 
                onPress={() => {
                  setDisplay('one')
                }}/>
                <MaterialCommunityIcons style={[styles.smallButton, {backgroundColor: display === 'two' ? colors.lightOrange : colors.white}]}
                name='view-grid' size={25} color={display === 'two' ? colors.white : colors.darkGray} 
                onPress={() => {
                  setDisplay('two')
                }}/>
                <MaterialCommunityIcons style={[styles.smallButton, {backgroundColor: display === 'three' ? colors.lightOrange : colors.white}]}
                name='view-parallel' size={25} color={display === 'three' ? colors.white : colors.darkGray} 
                onPress={() => {
                  setDisplay('three')
                }}/>
              </View>
          </View>
            {isLoading ? <ActivityIndicator color={colors.orange} size={'large'}/> : null}
            {dishesData
            ? 
            <DishList list={filteredData === null ? dishesData : filteredData} display={display} filterTags={filterTags} setFilterTags={setFilterTags}/> 
            : 
            <Text style={{fontSize: 20, marginTop: 10}}>Add some posts</Text>
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