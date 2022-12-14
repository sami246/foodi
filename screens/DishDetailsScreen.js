import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Linking, ScrollView  } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {colors, shadow, sizes, spacing} from '../constants/theme';
import ImagePreviewer from 'rc-image-previewer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Rating from '../components/Rating';
import { useNavigation } from '@react-navigation/native';
import Tags from '../components/Tags';
import AppButton from '../components/SmallComponents/AppButton';
import { Pressable } from 'react-native';
import BackButton from '../components/SmallComponents/BackButton';
import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from '../firebase';
import { DataContext } from '../contexts/DataContext';
import { isEmpty } from '@firebase/util';
import AppBannerAd from '../components/Ads/AppBannerAd';
import DeleteButton from '../components/SmallComponents/DeleteButton';


const DishDetailsScreen = ({ route }) => {
    const dish = route.params.dish;
    const navigation = useNavigation();
    const {fetchRestaurantData, handlePlaceholder, firebaseTimetoString} = useContext(DataContext);
    if(isEmpty(dish.tags)){
      dish.tags = null;
    }

    useEffect(() => {
      fetchRestaurantData(dish?.restaurantPlaceId).then(() => {
      })

    }, [])
    

    const handleTagPress = (tag) => {
      navigation.navigate("Dishes", {tag: [tag]})
    }

    const handleDaysAgo = () => {
      // To calculate the time difference of two dates
      // console.log(new Date(dish.date.seconds * 1000), new Date())
      var Difference_In_Time = new Date() - new Date(dish.date.seconds * 1000);

      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.floor((Difference_In_Time / (1000 * 3600 * 24)));
      Alert.alert("Time Flies!", `You had this ${Difference_In_Days} days ago! ???`)
    }

    const handleEditPress = () => {
      navigation.navigate('Add Dish', {dish: dish})
    }

    const handleRatingColour = () => {
      if(dish.rating === 1 || dish.rating === 2){
        return colors.red
      }
      else if(dish.rating === 3 || dish.rating === 4){
        return colors.orange
      }
      else if(dish.rating === 5 || dish.rating === 6){
        return colors.blue
      }
      else if(dish.rating === 7 || dish.rating === 8){
        return colors.green
      }
      else if(dish.rating === 9 || dish.rating === 10){
        return colors.gold
      }
      else{
        return colors.blue
      }
    };

    

  return (

    <SafeAreaView style={styles.container}>               
              <View style={styles.imageBox}>
                    <ImagePreviewer source={dish.image ? {uri: dish.image} : handlePlaceholder(dish.imagePlaceholder)} style={styles.image} resizeMode="cover" />
                    {/* <ImageView
                        images={[{source: {uri: dish.image}}]}
                        imageIndex={0}
                        isTapZoomEnabled={false}
                        animationType={'fade'}
                    /> */}
              </View>
              <View style={styles.detailsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.7} onPress={() => {Alert.alert("Dish Name", dish.dishName)}}>{dish.dishName}</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
                        <FontAwesome5 name='edit' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: spacing.s, alignItems: 'center', width: '95%', alignSelf: 'center'}} 
                onPress={handleEditPress}>
                      {dish.restaurantPlaceId ?
                      <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 10, borderColor: colors.green}}
                       onPress={() => { Linking.openURL(dish.googleUrl);}}>

                        <MaterialCommunityIcons name='google-maps' size={30} color={colors.green}/>
                      </Pressable>
                      :
                      <Pressable onPress={() => {Alert.alert("????", "If you want to get the information of the restaraunt consider editing the restaurant to be taken from the google search")}}>
                        <MaterialCommunityIcons name='map-marker' size={30} color={dish.restaurant ? colors.primary : colors.gray} />
                      </Pressable>
                      }
                    
                    {dish.restaurant ?

                     <Text onPress={() => {Alert.alert("Restaurant", dish.restaurant)}} numberOfLines={1}
                      style={{fontSize: sizes.h3, marginHorizontal: 15, maxWidth: '80%', alignSelf: 'center'}}>{dish.restaurant}</Text> 
                     :
                     <Pressable onPress={() => {if(!dish.restaurant){handleEditPress()}}}>
                       <Text numberOfLines={1} style={{fontSize: sizes.h3, paddingHorizontal: spacing.m, color: colors.gray}}>Add Restaurant</Text> 
                     </Pressable>
                     }
                    {dish.wouldHaveAgain ?
                          <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 10, borderColor: colors.green, height: 42}} onPress={() => {Alert.alert("Yummy!","You would have again ????")}}>
                            <MaterialCommunityIcons name='repeat' size={30} color={colors.green} />
                          </Pressable>
                          :
                          <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 10, borderColor: colors.gray, height: 42}} onPress={() => {Alert.alert("Nope! ","You wouldn't have this again")}}>
                            <MaterialCommunityIcons name='repeat' size={30} color={colors.gray} />
                          </Pressable>
                    }
                    
                </View>

                {dish.rating ?
                  <View style={{backgroundColor: handleRatingColour(), borderRadius: 15, marginVertical: spacing.s}}>
                    <Rating rating={dish.rating} fontSize={sizes.h3} iconSize={30} fontColor={colors.white} showText={true} iconColor={dish.rating == 9 || dish.rating ==10 ? colors.white : colors.gold}/>
                  </View>
                  : 
                  <View style={{backgroundColor: colors.lightGray, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.s, paddingVertical: spacing.xs, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => handleEditPress()}>
                      <FontAwesome name='star-o' size={25} color={colors.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: colors.lightGray, padding: 5, borderRadius: 5}} onPress={() => handleEditPress()}>
                      <Text style={{fontSize: sizes.h3, fontWeight: '500'}} >Add Rating</Text>
                    </TouchableOpacity>
                  </View>
                }
                </View>
                <View style={styles.additionalBox}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: spacing.s}}>
                      {dish.dateText && 
                      <Pressable style={styles.smallBox} onPress={handleDaysAgo}>
                          <Text style={{paddingRight: spacing.s, fontSize: 15, fontWeight: '400', color: colors.primary}}>Date Eaten</Text>
                          <FontAwesome5 name='calendar' size={15} color={colors.primary} />
                          <Text style={{paddingLeft: spacing.s, fontSize: 15, fontWeight: '400', color: colors.primary}}>{dish.dateText}</Text>
                      </Pressable>
                      }
                      {dish.price && 
                      <View style={styles.smallBox}>
                          <Text style={{paddingRight: spacing.s, fontSize: 15, fontWeight: '400', color: colors.primary}}>Price</Text>
                          <FontAwesome5 name='pound-sign' size={15} color={colors.primary} />
                          <Text style={{paddingLeft: spacing.s, fontSize: 15, fontWeight: '400', color: colors.primary, overflow: 'hidden'}}>{dish.price}</Text>
                        </View>
                      }
                      {!dish.price && !dish.dateText && 
                        <Pressable style={[styles.smallBox, {borderBottomWidth: 0 ,}]} onPress={() => handleEditPress()}>
                          <Text style={{paddingRight: spacing.s, fontSize: 14, fontWeight: '300', color: colors.darkGray}}>Add More Details like Price and Date Eaten</Text>
                          <FontAwesome5 name='plus' size={15} color={colors.gray} />
                        </Pressable>
                      }
                    </View>
                    {/* <Pressable onPress={handleEditPress}>
                      <Text style={[styles.comment, dish.comment ? {} : {color: colors.gray}]}>{dish.comment ? dish.comment : "Add a comment..."}</Text>
                    </Pressable> */}
                    <ScrollView style={[styles.comment]}>
                      <Text selectable={true} style={{paddingBottom: 20, paddingTop: -10, color: dish.comment ? colors.primary : colors.lightGray}}>{dish.comment ? dish.comment : "Add a comment..."}</Text>
                    </ScrollView>   
                    
                    <View style={{flexDirection: 'row', marginVertical: spacing.s, justifyContent: 'space-evenly', paddingBottom: 15}}>
                        {dish.tags && dish.tags !== [] ?
                          <Tags tags={dish.tags} bColor={colors.lightOrange} fColor={colors.white} handleTagPress={handleTagPress} wrap={false}/>
                        :
                          <View style={{alignItems: 'center', width: 120, height: 50, textAlignVertical: 'center'}}>
                            <AppButton backgroundColor={colors.gray} color={colors.white} title={'ADD TAGS'} height={100} width={120}
                            icon={<FontAwesome name='plus' size={21} color='white' />}
                            onPress={() => {handleEditPress()}}
                            fontSize={13}
                            />
                          </View>
                        }
                    </View>
                      {dish.updatedTime && 
                      <Text style={{position:'relative', bottom: 2, fontSize: 9, fontWeight: '300', color: colors.darkGray, textAlign: 'center'}}>
                        Last Updated: {firebaseTimetoString(dish.updatedTime)}
                      </Text>
                      }
                      
              </View>
              <BackButton iconColor={colors.orange}/>
              <DeleteButton iconColor={colors.orange} item={dish}/>

    </SafeAreaView>

  )
}

export default DishDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.blue,
    borderBottomWidth: 1.5,
    paddingBottom: spacing.xs,
    marginBottom: spacing.s,
    justifyContent: 'space-between'
  }
  ,
  editIcon: {
    paddingLeft: spacing.s
  },
  title: {
    width: '90%',
    fontSize: sizes.h1,
    fontWeight: 'bold',
  },
  imageBox: {
    flex: 4,
    width: sizes.width,
    height: '100%',
    borderBottomLeftRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
    overflow: 'hidden',
    elevation: 5
  },
  image: {
    width: sizes.width,
    height: '100%',
    resizeMode: 'cover'
  },
  detailsBox : {
    paddingHorizontal: 10,
    paddingTop: 10,
    flex: 2,
    width: sizes.width,
  },
  additionalBox: {
    paddingTop: spacing.s,
    paddingHorizontal: 10,
    flex: 4,
    width: sizes.width,
    justifyContent: 'space-around',
  },

  rating: {
    fontSize: sizes.h3
  },
  comment: {
    backgroundColor: colors.white,
    margin: 3,
    padding: 10,
    borderRadius: 10,
    height: 150,
    maxHeight: 150,
    elevation: 2
  },
  smallBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: colors.blue 
  },
})