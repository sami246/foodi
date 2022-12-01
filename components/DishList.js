import React, {useEffect} from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing, STATUS_BAR_HEIGHT} from '../constants/theme';
import AppLoader from './AppLoader';
import TwoDisplay from './Displays/TwoDisplay';
import ThreeDisplay from './Displays/ThreeDisplay';
import OneDisplay from './Displays/OneDisplay';

const DishList = ({list, display}) => {
  const renderItemFull = ({ item }) => (
    <OneDisplay item={item} />
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
            data={list}
            renderItem={renderItemFull}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}        
          />
      </View>
    )

  }
  if(display === 'two'){
    return(
      <View style={styles.container}>
          <View style={styles.containerHalf}>
            <FlatList
            key={item => item.id}
            data={list}
            scrollToOverflowEnabled={true}
            scrollEnabled={true}
            renderItem={renderItemTwo}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} 
            numColumns={2}                  // set number of columns     
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
            key={item => item.dishName + item.restaurant} // Have to have a different key
            data={list}
            scrollToOverflowEnabled={true}
            scrollEnabled={true}
            renderItem={renderItemThree}
            keyExtractor={item => item.dishName + item.restaurant}
            showsVerticalScrollIndicator={false} 
            numColumns={3}                  // set number of columns    
            centerContent = {true} 
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