import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Linking  } from 'react-native'
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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const RestaurantDetailsScreen = ({ route }) => {
    const item = route.params.restaurant;
    const navigation = useNavigation();
    const {fetchRestaurantData, handlePlaceholder, fetchDishesData, firebaseTimetoString} = useContext(DataContext);
    
    if(isEmpty(item.tags)){
      item.tags = null;
    }

    useEffect(() => {
      fetchDishesData()
      fetchRestaurantData(item?.restaurantPlaceId).then(() => {
      })

    }, [])
    

    const handleTagPress = (tag) => {
      navigation.navigate("Dishes", {tag: [tag]})
    }

    const handleDaysAgo = () => {
      // To calculate the time difference of two dates
      // console.log(new Date(item.date.seconds * 1000), new Date())
      var Difference_In_Time = new Date() - new Date(item.date.seconds * 1000);

      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.floor((Difference_In_Time / (1000 * 3600 * 24)));
      Alert.alert("Time Flies!", `You had this ${Difference_In_Days} days ago! ⏳`)
    }

    const handleDeleteDish = () => {
      Alert.alert(  
        'Delete',  
        'Are you sure you want to delete?',  
        [  
            {  
                text: 'No',  
                onPress: () => console.log('Cancel Delete'),  
                style: 'cancel',  
            },  
            {text: 'Yes', onPress: async () => {
              await deleteDoc(doc(firestoreDB, "dishs", item.id));
              navigation.goBack()
            }},  
        ]  
    );  
    }

    const handleEditPress = () => {
      navigation.navigate('Add Restaurant', {item: item})
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
                <Pressable style={{position: 'absolute', zIndex: 1, top: 0, right: 0, padding: 15, backgroundColor: colors.blue}} onPress={() => {handleDeleteDish()}}>
                    <MaterialCommunityIcons name='delete-outline' size={30} color={colors.white} />
                </Pressable>
              <View style={styles.detailsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.7} onPress={() => {Alert.alert("Restaurant Name", item.name)}}>{item.name}</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
                        <FontAwesome5 name='edit' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: spacing.s, alignItems: 'center', width: '95%', alignSelf: 'center'}} >
                      {item.url ?
                      <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 10, borderColor: colors.green}}
                       onPress={() => { Linking.openURL(item.url);}}>
                      {/* onPress={() => { console.log(googlePlace);}}> */}
                        <MaterialCommunityIcons name='google-maps' size={30} color={colors.green}/>
                      </Pressable>
                      :
                      <Pressable onPress={() => {Alert.alert("📍", "If you want to get the information of the restaraunt consider editing the restaurant to be taken from the google search")}}>
                        <MaterialCommunityIcons name='map-marker' size={30} color={item.restaurant ? colors.primary : colors.gray} />
                      </Pressable>
                      }
                    
                     <Text onPress={() => {Alert.alert("Address", item.address)}} numberOfLines={1}
                      style={{fontSize: sizes.h3, marginHorizontal: 15, maxWidth: '80%', alignSelf: 'center'}}>{item.address}</Text> 

                     {item.wouldHaveAgain ?
                     <Pressable style={{elevation: 3, borderWidth: 1, padding: spacing.xs, backgroundColor: colors.white, borderRadius: 10, borderColor: colors.green}} onPress={() => {Alert.alert("Yummy!","You would have again 😋")}}>
                        <MaterialCommunityIcons name='repeat' size={28} color={colors.green} />
                      </Pressable> 
                      :
                      <View style={{padding: spacing.xs}}>
                      <MaterialCommunityIcons name='repeat' size={28} color={colors.gray} />
                      </View>
                      }
                    
                </View>
                {/* <Text>{googlePlace.address}</Text> */}
                {item.userRating ?
                  <View style={{backgroundColor: handleRatingColour(), borderRadius: 15, marginVertical: spacing.s}}>
                    <Rating rating={item.userRating} fontSize={sizes.h3} iconSize={30} fontColor={colors.white} showText={true} iconColor={item.userRating == 9 || item.userRating ==10 ? colors.white : colors.gold}/>
                  </View>
                  : 
                  <View style={{backgroundColor: colors.lightGray, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.s, paddingVertical: spacing.xs, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => handleEditPress()}>
                      <FontAwesome name='star-o' size={25} color={colors.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: colors.lightGray, padding: 5, borderRadius: 5}} onPress={() => handleEditPress()}>
                      <Text style={{fontSize: sizes.h3, fontWeight: '500'}} >Add Your Own Rating</Text>
                    </TouchableOpacity>
                  </View>
                }
                </View>
                <View style={styles.additionalBox}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: spacing.s}}>
                      {item.price && 
                      <View style={styles.smallBox}>
                          <Text style={{paddingRight: spacing.s, fontSize: 15, fontWeight: '400', color: colors.primary}}>Price</Text>
                          <FontAwesome5 name='pound-sign' size={15} color={colors.primary} />
                          <Text style={{paddingLeft: spacing.s, fontSize: 15, fontWeight: '400', color: colors.primary, overflow: 'hidden'}}>{item.price}</Text>
                        </View>
                      }
                      {!item.price && 
                        <Pressable style={[styles.smallBox, {borderBottomWidth: 0 ,}]} onPress={() => handleEditPress()}>
                          <Text style={{paddingRight: spacing.s, fontSize: 14, fontWeight: '300', color: colors.darkGray}}>Add More Details like Price and Date Eaten</Text>
                          <FontAwesome5 name='plus' size={15} color={colors.gray} />
                        </Pressable>
                      }
                    </View>
                    <Pressable onPress={handleEditPress}>
                      <Text style={[styles.comment, item.comment ? {} : {color: colors.gray}]}>{item.comment ? item.comment : "Add a comment..."}</Text>
                    </Pressable>
                    
                    <View style={{flexDirection: 'row', marginVertical: spacing.s, justifyContent: 'space-evenly', paddingBottom: 15}}>
                        {item.tags && item.tags !== [] ?
                          <Tags tags={item.tags} bColor={colors.lightOrange} fColor={colors.white} handleTagPress={handleTagPress} wrap={false}/>
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
                    <View>
                        <Text>TODO: ADD MAP LOCATION</Text>
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
                      {item.updatedTime && 
                      <Text style={{position:'relative', bottom: 2, fontSize: 9, fontWeight: '300', color: colors.darkGray, textAlign: 'center'}}>
                        Last Updated: {firebaseTimetoString(item.updatedTime)}
                      </Text>
                      }
                      
              </View>
              <BackButton iconColor={colors.white}/>

    </SafeAreaView>

  )
}

export default RestaurantDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  categoryBox: {
    backgroundColor: colors.brown,
    height: 40,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center'

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
  image: {
    width: sizes.width,
    height: '100%',
    resizeMode: 'cover'
  },
  detailsBox : {
    top: 55,
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
    height: 120,
    maxHeight: 120,
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