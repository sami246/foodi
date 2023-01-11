import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Linking, Image, ScrollView } from 'react-native'
import React, {useContext, useEffect, useState, useRef} from 'react'
import {colors, shadow, sizes, spacing} from '../constants/theme';
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
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import TopPlacesCarousel from '../components/TopPlacesCarousel'
import { TOP_PLACES } from '../data';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapPlaceholder from '../assets/place-holders/map-placeholder.png'
import AppBannerAd from '../components/Ads/AppBannerAd';
import uuid from "uuid";
import DeleteButton from '../components/SmallComponents/DeleteButton';
import RestaurantDishesCarousel from '../components/RestaurantDishesCarousel';
import { Gooogle_API_Key } from '../config';
import AppMapMarker from '../components/AppMapMarker';
// var GoogleStaticMap = require('react-native-google-static-map');


const RestaurantDetailsScreen = ({ route }) => {
    const item = route.params.restaurant;
    const navigation = useNavigation();
    const region = {
      latitude: item.coordinate.latitude,
      longitude: item.coordinate.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }
    const {fetchRestaurantData, handlePlaceholder, firebaseTimetoString, dishesDataByRecent} = useContext(DataContext);
    
    if(isEmpty(item.tags)){
      item.tags = null;
    }

    useEffect(() => {
      // fetchRestaurantData(item?.restaurantPlaceId).then(() => {
      // })

    }, [])
    

    const handleTagPress = (tag) => {
      navigation.navigate("Map", {tag: [tag]})
    }

    const handleLinkIcon = (link) => {
      if(link?.toLowerCase().indexOf("instagram") > -1 || link?.toLowerCase().indexOf("insta") > -1){
        return <MaterialCommunityIcons name='instagram' size={14} color={colors.darkGray} />
      }
      else{
        return <MaterialCommunityIcons name='link' size={14} color={colors.darkGray} />
      }
    }
    

    const handlePriceLevel = (level) => {
      const rows = [];
      for(let index = 0; index < level; index++) {
            rows.push(<FontAwesome5 key={uuid.v4()} style={{marginHorizontal: 1}} name='pound-sign' size={12} color={colors.green} />)  
      }
      return rows
    }

    const handleEditPress = () => {
      navigation.navigate('Add Restaurant', {item: item})
    }

    const handleGoogleLink = () => {
      if(item.googleUrl){
        console.log("Has URl")
        Linking.openURL(item.googleUrl);
      }
      else{console.log("NO URL")}
    }

    let mapIconColor = colors.brown
    if (item.category == 2){
      mapIconColor = colors.darkBlue
    }
    else if (item.category === 1){
      mapIconColor = colors.darkGreen
    }
    else if (item.category === 3){
      mapIconColor = colors.gold
    }

    const handleRatingColour = () => {
      if(item.userRating === 1 || item.userRating === 2){
        return colors.red
      }
      else if(item.userRating === 3 || item.userRating === 4){
        return colors.orange
      }
      else if(item.userRating === 5 || item.userRating === 6){
        return colors.blue
      }
      else if(item.userRating === 7 || item.userRating === 8){
        return colors.green
      }
      else if(item.userRating === 9 || item.userRating === 10){
        return colors.gold
      }
      else{
        return colors.blue
      }
    };

  const handleRecenter = () => {
    _map.current.animateToRegion(region)
  }

  const _map = useRef(null);

  return (

    <SafeAreaView style={styles.container}>
              <AppBannerAd height={100} width={sizes.width}/>
              <View style={styles.contentContainer}>
              <View style={styles.detailsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.7} onPress={() => {Alert.alert("Restaurant Name", item.name)}}>{item.name}</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
                        <FontAwesome5 name='edit' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5}}>
                    {/* <View style={{alignSelf: 'center'}}>
                    {item.googleUrl ?
                      <Pressable style={styles.iconBox}
                      onPress={() => { Linking.openURL(item.googleUrl);}}>

                        <MaterialCommunityIcons name='google-maps' size={25} color={colors.green}/>
                      </Pressable>
                      :
                      <Pressable style={[styles.iconBox, {color: colors.gray, borderColor: colors.gray}]} onPress={() => {Alert.alert("📍", "If you want to get the information of the restaraunt consider editing the restaurant to be taken from the google search")}}>
                        <MaterialCommunityIcons name='map-marker' size={25} color={item.restaurant ? colors.primary : colors.gray} />
                      </Pressable>
                      }
                    </View> */}
                  {item.userRating ?
                    <View style={{backgroundColor: handleRatingColour(), borderRadius: 15, marginVertical: spacing.s, width: '87%'}}>
                      <Rating rating={item.userRating} fontSize={sizes.h3} iconSize={28} fontColor={colors.white} showText={true} iconColor={item.userRating == 9 || item.userRating ==10 ? colors.white : colors.gold}/>
                    </View>
                    : 
                    <View style={{backgroundColor: colors.lightGray, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.s, paddingVertical: spacing.xs, alignItems: 'center', width: '87%'}}>
                      <TouchableOpacity onPress={() => handleEditPress()}>
                        <FontAwesome name='star-o' size={25} color={colors.gray} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{backgroundColor: colors.lightGray, padding: 5, borderRadius: 15}} onPress={() => handleEditPress()}>
                        <Text style={{fontSize: sizes.h3, fontWeight: '500'}} >Add Your Own Rating</Text>
                      </TouchableOpacity>
                    </View>
                  }
                    <View style={{alignSelf: 'center'}}>
                        {item.wouldHaveAgain ?
                          <Pressable style={[styles.iconBox, {paddingTop: 3}]} onPress={() => {Alert.alert("Yummy!","You would have again 😋")}}>
                            <MaterialCommunityIcons name='repeat' size={27} color={colors.green} />
                          </Pressable>
                          :
                          <Pressable style={[styles.iconBox, {color: colors.gray, borderColor: colors.gray, paddingTop: 3,}]} onPress={() => {Alert.alert("Nope! ","You wouldn't have this again")}}>
                            <MaterialCommunityIcons name='repeat' size={27} color={colors.gray} />
                          </Pressable>
                        }
                    </View>
                </View>
              </View>
                <View style={styles.additionalBox}>
                    {/* Comments */}
                    <ScrollView style={[styles.whiteBox, {height: 100}]}>
                      <Text selectable={true} style={{paddingBottom: 20, paddingTop: -10, color: item.comment ? colors.primary : colors.lightGray}}>{item.comment ? item.comment : "Add a comment..."}</Text>
                    </ScrollView>     
                    <View style={styles.linkContainer}>
                      {/* TODO Add hold copy to clipboard */}
                        {item.links ?
                        
                        item.links?.map((link, index) => (
                          <TouchableOpacity style={[styles.whiteBox, styles.linkBox]} onPress={() => {Linking.openURL(link)}}>
                              {handleLinkIcon(link)}
                              <Text numberOfLines={1} style={styles.linkText}>{link}</Text>
                          </TouchableOpacity>
                        ))
                        :
                        <TouchableOpacity style={[styles.whiteBox, styles.linkBox]} onPress={handleEditPress}>
                               <MaterialCommunityIcons name='link' size={14} color={colors.lightGray} />
                               <Text numberOfLines={1} style={[styles.linkText, {color:colors.lightGray}]}>Add Link</Text>
                        </TouchableOpacity>
                        
                        
                      }
                    </View>   

                    {/* LONGTODO Add Potential Dishes */}
                    {/* <RestaurantDishesCarousel list={dishesDataByRecent}/>           */}
                </View>
              <View style={styles.googleContainer}>
                  <View style={styles.whiteBox}>
                        {item?.address && 
                          <TouchableOpacity style={styles.googleLine} onPress={handleGoogleLink}>
                            <Text style={styles.googleLabel}>Address:</Text>
                            <Text style={{paddingHorizontal: 10, fontSize: 12}}>{item.address}</Text>
                          </TouchableOpacity>
                        }

                        {item?.googleWebsite && 
                          <TouchableOpacity style={styles.googleLine} onPress={() => {Linking.openURL(item.googleWebsite)}}>
                            <Text style={styles.googleLabel}>Website:</Text>
                            <Text style={{paddingHorizontal: 10, fontSize: 12}}>{item.googleWebsite}</Text>
                          </TouchableOpacity>
                        }

                    
                          <View style={styles.googleAdditionalBox}>
                                {item.googlePriceLevel && 
                                <TouchableOpacity style={styles.googleSmallBox} onPress={handleGoogleLink}>
                                  <Text style={styles.googleLabel}>Price Level:</Text>
                                  <View style={styles.googleIconSmall}>
                                  {handlePriceLevel(item?.googlePriceLevel)}
                                  </View>
                                </TouchableOpacity>
                                }
                                {item.googleRating && 
                                <TouchableOpacity style={styles.googleSmallBox} onPress={handleGoogleLink}>
                                  <Text style={styles.googleLabel}>Google Rating:</Text>
                                  <View style={styles.googleIconSmall}>
                                    <FontAwesome5 name='star' size={15} color={colors.gold} />
                                  </View>
                                  <Text style={{color: colors.gold, fontWeight: '500'}}> {item.googleRating}</Text>
                                 </TouchableOpacity>

                                }
                          </View>


                      {item.coordinate ?
                      <View style={styles.mapBox} onPress={handleGoogleLink}>
                            {/* TODO Add Static Map */}

                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                ref={_map}
                                region={region}
                                showsPointsOfInterest={false}
                                showsBuildings={false}
                              >
                                <AppMapMarker mapIconColor={mapIconColor} item={item} onPress={() => {}} onDeselect={() => {}} />

                            </MapView>
                            <TouchableOpacity style={[styles.iconBox,
                            {position: 'absolute' , top: 5, right: 5, height: 35, width: 35, borderColor: colors.darkGray}]}
                            onPress={handleRecenter}
                            >
                                    <MaterialCommunityIcons name='image-filter-center-focus' size={23} color={colors.darkGray}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.iconBox,
                            {position: 'absolute' , top: 5, left: 5, height: 35, width: 35, borderColor: colors.green}]}
                            onPress={() => { Linking.openURL(item.googleUrl);}}>

                              <MaterialCommunityIcons name='google-maps' size={25} color={colors.green}/>
                            </TouchableOpacity>

                      </View>
                      :
                      <TouchableOpacity style={styles.mapBox} onPress={handleEditPress}>
                            <Text>Add Location</Text>
                      </TouchableOpacity>
                      }

                  </View>
                </View>
                <View style={[styles.additionalBox, {}]}>
                    <View style={styles.tagsBox}>
                        {item.tags && item.tags !== [] ?
                          <Tags tags={item.tags} bColor={colors.blue} fColor={colors.white} handleTagPress={handleTagPress} wrap={false}/>
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
                     {item.category == 1 &&
                      <Pressable style={[styles.categoryBox,{backgroundColor: colors.green} ]} onPress={() => {}} >
                          <AntDesign name='pushpin' size={20} color={colors.white} style={{alignSelf: 'center'}}/>
                          <Text style={styles.categoryText}>Want to Go</Text>
                      </Pressable>
                      }
                      {item.category == 2 &&
                      <Pressable style={[styles.categoryBox,{backgroundColor: colors.darkBlue} ]} onPress={() => {}} >
                            <MaterialCommunityIcons name='check-bold' size={21} color={colors.white} style={{alignSelf: 'center'}}/>
                            <Text style={styles.categoryText}>Already Been</Text>
                      </Pressable>
                      }
                      {item.category == 3 &&
                      <Pressable style={[styles.categoryBox,{backgroundColor: colors.gold} ]} onPress={() => {}} >
                            <FontAwesome name='star' size={20} color={colors.white} style={{alignSelf: 'center'}}/>
                            <Text style={styles.categoryText}>Favourite</Text>
                      </Pressable>
                      }
                      {item.category == null &&
                      <Pressable style={[styles.categoryBox,{backgroundColor: colors.lightGray} ]} onPress={handleEditPress} >
                            <Text style={[styles.categoryText, {fontWeight: '400', fontSize: 16}]}>Add to a Category</Text>
                      </Pressable>
                      }
                </View>




              </View>
              {item.updatedTime && 
                <Text style={{position:'relative', bottom: 0, fontSize: 9, fontWeight: '300', color: colors.darkGray, textAlign: 'center'}}>
                  Last Updated: {firebaseTimetoString(item.updatedTime)}
                </Text>
              }
              <BackButton iconColor={colors.darkBlue}/>
              <DeleteButton iconColor={colors.darkBlue} item={item}/>
    </SafeAreaView>

  )
}

export default RestaurantDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: sizes.height
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: sizes.width,
    // justifyContent: 'space-evenly'
    // justifyContent: 'space-around'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryBox: {
    backgroundColor: colors.brown,
    height: 40,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryText: {
    paddingLeft: 20,
    fontSize: 20,
    color: colors.white,
    textAlignVertical: 'center',
    fontWeight: '600',
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.blue,
    borderBottomWidth: 1.5,
    paddingBottom: spacing.xs,
    marginBottom: spacing.s,
    justifyContent: 'space-between'
  },
  editIcon: {
    paddingLeft: spacing.s
  },
  title: {
    width: '90%',
    fontSize: sizes.h1,
    fontWeight: 'bold',
  },
  image: {
    width: sizes.width,
    height: '100%',
    resizeMode: 'cover'
  },
  googleContainer: {
    paddingHorizontal: 10,
    width: sizes.width,
  },
  googleAdditionalBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5
  },
  googleLine:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 1
  },
  googleLabel: {
    fontWeight: '600',
    fontSize: 12,
    alignSelf: 'center'
  },
  googleIconSmall: {
    paddingHorizontal: spacing.s,
    flexDirection: 'row',
    alignSelf: 'center',
    textAlignVertical: 'center'
  },
  googleSmallBox: {
    backgroundColor: colors.white,
    elevation: 3,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 0.1,
  },
  whiteBox: {
    backgroundColor: colors.white,
    margin: 3,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  detailsBox : {
    paddingHorizontal: 10,
    marginTop: 5,
    width: sizes.width,
  },
  additionalBox: {
    paddingHorizontal: 10,
    width: sizes.width,
  },
  tagsBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 5,
    height: 55,
    marginVertical: 5
  },
  rating: {
    fontSize: sizes.h3
  },
  mapBox: {
    borderWidth: 0,
    borderColor: colors.gray,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    height: 160, width: '100%'
  },
  iconBox: {
    elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 15, borderColor: colors.green, height: 36, width: 36,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  linkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 66,
    marginBottom: 5
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '48%',
    padding: 6,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: colors.blue
  },
  linkText: {
    paddingHorizontal: 6,
    fontSize: 11,
    color: colors.darkGray,
    textAlignVertical: 'center'
  },
})