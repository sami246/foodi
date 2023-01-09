import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Linking, Image  } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapPlaceholder from '../assets/place-holders/map-placeholder.png'
import AppBannerAd from '../components/Ads/AppBannerAd';
import uuid from "uuid";
import DeleteButton from '../components/SmallComponents/DeleteButton';


const RestaurantDetailsScreen = ({ route }) => {
    const item = route.params.restaurant;
    const navigation = useNavigation();
    const {fetchRestaurantData, handlePlaceholder, firebaseTimetoString} = useContext(DataContext);
    
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

    const handlePriceLevel = (level) => {
      const rows = [];
      for(let index = 0; index < level; index++) {
            rows.push(<FontAwesome5 key={uuid.v4()} style={{marginHorizontal: 1}} name='pound-sign' size={13} color={colors.green} />)  
      }
      return rows
    }

    const handleEditPress = () => {
      navigation.navigate('Add Restaurant', {item: item})
    }

    let region = {
      latitude: 51.537430,
      longitude: -0.125250,
      latitudeDelta: 0.150,
      longitudeDelta: 0.150,
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

  return (

    <SafeAreaView style={styles.container}>
                <View style={{marginTop: -10}}>
                <AppBannerAd height={100} width={sizes.width}/>
                </View>
                
              <View style={styles.detailsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.7} onPress={() => {Alert.alert("Restaurant Name", item.name)}}>{item.name}</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
                        <FontAwesome5 name='edit' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  {item.userRating ?
                    <View style={{backgroundColor: handleRatingColour(), borderRadius: 10, marginVertical: spacing.s, width: '86%'}}>
                      <Rating rating={item.userRating} fontSize={sizes.h3} iconSize={30} fontColor={colors.white} showText={true} iconColor={item.userRating == 9 || item.userRating ==10 ? colors.white : colors.gold}/>
                    </View>
                    : 
                    <View style={{backgroundColor: colors.lightGray, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.s, paddingVertical: spacing.xs, alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => handleEditPress()}>
                        <FontAwesome name='star-o' size={25} color={colors.gray} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{backgroundColor: colors.lightGray, padding: 5, borderRadius: 5}} onPress={() => handleEditPress()}>
                        <Text style={{fontSize: sizes.h3, fontWeight: '500'}} >Add Your Own Rating</Text>
                      </TouchableOpacity>
                    </View>
                  }
                    <View style={{alignSelf: 'center'}}>
                        {item.wouldHaveAgain ?
                          <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 15, borderColor: colors.green, height: 42}} onPress={() => {Alert.alert("Yummy!","You would have again 😋")}}>
                            <MaterialCommunityIcons name='repeat' size={30} color={colors.green} />
                          </Pressable>
                          :
                          <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 15, borderColor: colors.gray, height: 42}} onPress={() => {Alert.alert("Nope! ","You wouldn't have this again")}}>
                            <MaterialCommunityIcons name='repeat' size={30} color={colors.gray} />
                          </Pressable>
                        }
                    </View>
                </View>
                
                {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: spacing.s, alignItems: 'center', width: '95%', alignSelf: 'center'}} >
                      {item.googleUrl ?
                      <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 10, borderColor: colors.green}}
                       onPress={() => { Linking.openURL(item.googleUrl);}}>

                        <MaterialCommunityIcons name='google-maps' size={25} color={colors.green}/>
                      </Pressable>
                      :
                      <Pressable onPress={() => {Alert.alert("📍", "If you want to get the information of the restaraunt consider editing the restaurant to be taken from the google search")}}>
                        <MaterialCommunityIcons name='map-marker' size={25} color={item.restaurant ? colors.primary : colors.gray} />
                      </Pressable>
                      }
                    
                     <Text onPress={() => {Alert.alert("Address", item.address)}} numberOfLines={1}
                      style={{fontSize: sizes.body, marginHorizontal: 15, maxWidth: '80%', alignSelf: 'center'}}>Address: {item.address}
                     </Text> 
                   
                </View> */}
                </View>
                <View style={styles.additionalBox}>
                    <Pressable onPress={handleEditPress}>
                      <Text style={[styles.whiteBox, {color: item.comment ? colors.primary : colors.lightGray, maxHeight: 120, height: 80}]}>{item.comment ? item.comment : "Add a comment..."}</Text>
                    </Pressable>                     
              </View>
              <View style={styles.googleContainer}>
                  <View style={styles.whiteBox}>
                        {item?.address && 
                          <View style={styles.googleLine}>
                            <Text style={styles.googleLabel}>Address:</Text>
                            <Text style={{paddingHorizontal: 10}}>{item.address}</Text>
                          </View>
                        }

                        {item?.googleWebsite && 
                          <View style={styles.googleLine}>
                            <Text style={styles.googleLabel}>Website:</Text>
                            <Text style={{paddingHorizontal: 10}}>{item.googleWebsite}</Text>
                          </View>
                        }

                    
                          <View style={styles.googleAdditionalBox}>
                                {item.googlePriceLevel && 
                                <View style={styles.googleSmallBox}>
                                  <Text style={styles.googleLabelSmall}>Price Level:</Text>
                                  <View style={styles.googleIconSmall}>
                                  {handlePriceLevel(item?.googlePriceLevel)}
                                  </View>
                                </View>
                                }
                                {item.googleRating && 
                                <View style={styles.googleSmallBox}>
                                  <Text style={styles.googleLabelSmall}>Google Rating:</Text>
                                  <View style={styles.googleIconSmall}>
                                    <FontAwesome5 name='star' size={14} color={colors.gold} />
                                  </View>
                                  <Text style={{color: colors.gold}}> {item.googleRating}</Text>
                                 </View>

                                }
                          </View>


                      {item.coordinate && 
                      <View style={styles.mapBox}>
                            {/* TODO Add Static Map */}
                            {/* <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                region={{
                                  latitude: item.coordinate.latitude,
                                  longitude: item.coordinate.longitude,
                                  latitudeDelta: 0.150,
                                  longitudeDelta: 0.150,
                                }}
                                showsPointsOfInterest={false}
                                showsBuildings={false}
                              >
                            </MapView> */}
                            <Image source={MapPlaceholder} resizeMethod='resize' resizeMode='cover' style={{height: 200, width: '100%'}}/>
                      </View>
                      }

                  </View>
                </View>
                <View style={styles.additionalBox}>
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

              {item.updatedTime && 
                <Text style={{position:'relative', bottom: 2, fontSize: 9, fontWeight: '300', color: colors.darkGray, textAlign: 'center'}}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-around'
  },
  categoryBox: {
    backgroundColor: colors.brown,
    height: 40,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
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
    marginVertical: spacing.m
  },
  googleAdditionalBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5
  },
  googleLine:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8
  },
  googleLabel: {
    width: 70,
  },
  googleLabelSmall: {
    // fontSize: 12,
    textAlignVertical: 'center',
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row'
  },
  whiteBox: {
    backgroundColor: colors.white,
    margin: 3,
    padding: 10,
    borderRadius: 10,
    elevation: 2
  },
  detailsBox : {
    paddingHorizontal: 10,
    paddingTop: 20,
    marginTop: 10,
    width: sizes.width,
  },
  additionalBox: {
    paddingTop: spacing.s,
    paddingHorizontal: 10,
    width: sizes.width,
  },
  tagsBox: {
    flexDirection: 'row',
    marginVertical: spacing.xs,
    justifyContent: 'space-evenly',
    paddingBottom: 5
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
    elevation: 3
  },
})