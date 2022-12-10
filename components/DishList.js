import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {sizes, spacing} from '../constants/theme';
import AppLoader from './AppLoader';
import TwoDisplay from './Displays/TwoDisplay';
import ThreeDisplay from './Displays/ThreeDisplay';
import OneDisplay from './Displays/OneDisplay';
import { useEffect } from 'react';
import uuid from "uuid";
import { useState } from 'react';

const DishList = ({list, display, setFilterTags, filterTags, refreshing, onRefresh}) => {
  const [list1, setList1] = useState([...list]);
  const [list2, setList2] = useState([...list]);
  const [list3, setList3] = useState([...list]);

  useEffect(() => {
    var length = list.length;
    var numoftimedividedby4 = Math.floor(length/4);
    var numoftimedividedby6 = Math.floor(length/6);
    var numoftimedividedby9 = Math.floor(length/9);

    if(display==="three"){
      var temp = [...list];
      for (let i = 1; i <= numoftimedividedby9; i++) {
        temp.splice(9*i + (i-1), 0, {empty: 'empty'});
        temp.splice(9*i + (i-1), 0, {empty: 'empty'});
        temp.splice(9*i + (i-1), 0, {ad: 'ad'});
      }
      setList3(temp)
    }
    else if(display ==="two"){
      var temp = [...list];
      for (let i = 1; i <= numoftimedividedby6; i++) {
        temp.splice(6*i + (i-1), 0, {ad: 'ad'});
      }
      setList2(temp)
    }
    else{
      var temp = [...list];
      for (let i = 1; i <= numoftimedividedby4; i++) {

        temp.splice(4*i + (i-1), 0, {ad: 'ad'});
      }
      setList1(temp)
    }
    
  }, [list, refreshing, display] || [])
  

  const renderItemFull = ({ item }) => (
    <OneDisplay item={item} setFilterTags={setFilterTags} filterTags={filterTags}/>
  );

  const renderItemTwo = ({ item }) => (
    <TwoDisplay item={item} />
    
  );

  const renderItemThree = ({ item }) => (
    <ThreeDisplay item={item} />
    
  );

  if(!list){
    return(
      <AppLoader />
    )
  }

  if(display === 'one'){
    return(
      <View style={styles.container}>
          <FlatList
            data={list1}
            extraData={refreshing}
            renderItem={renderItemFull}
            keyExtractor={item => item.id || uuid.v4()}
            showsVerticalScrollIndicator={false} 
            refreshing={refreshing}
            initialNumToRender={4}
            onRefresh={onRefresh}
          />
      </View>
    )

  }
  if(display === 'two'){
    return(
      <View style={styles.container}>
          <View style={styles.containerHalf}>
            <FlatList
            key={item => item.id || uuid.v4()}
            data={list2}
            extraData={refreshing}
            scrollToOverflowEnabled={true}
            scrollEnabled={true}
            renderItem={renderItemTwo}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} 
            numColumns={2}                  // set number of columns    
            centerContent = {true}  
            refreshing={refreshing}
            initialNumToRender={10}
            maxToRenderPerBatch= {10}
            onRefresh={onRefresh}
          />
        </View>
      </View>
    )
  }
  if(display === 'three'){
    return(
      <View style={styles.container}>
          <View style={styles.containerThree}>
            <FlatList
            key={item => item.dishName + item.restaurant || uuid.v4()} // Have to have a different key
            data={list3}
            extraData={refreshing}
            scrollToOverflowEnabled={true}
            scrollEnabled={true}
            renderItem={renderItemThree}
            keyExtractor={item => item.dishName + item.restaurant}
            showsVerticalScrollIndicator={false} 
            numColumns={3}                  // set number of columns    
            centerContent = {true} 
            refreshing={refreshing}
            initialNumToRender={15}
            onRefresh={onRefresh}
            columnWrapperStyle={{justifyContent: 'flex-start'}}
          />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: spacing.s,
    marginTop: spacing.s,
  },
  containerHalf: {
    width: sizes.width,
  },
  containerThree: {
    width: sizes.width,
    alignItems: 'center'
  },
});

export default DishList;