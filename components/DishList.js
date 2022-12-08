import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {sizes, spacing} from '../constants/theme';
import AppLoader from './AppLoader';
import TwoDisplay from './Displays/TwoDisplay';
import ThreeDisplay from './Displays/ThreeDisplay';
import OneDisplay from './Displays/OneDisplay';

const DishList = ({list, display, setFilterTags, filterTags, refreshing}) => {
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
            data={list}
            extraData={refreshing}
            renderItem={renderItemFull}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} 
            refreshing={refreshing}
            initialNumToRender={4}
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