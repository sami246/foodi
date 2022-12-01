import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, {useContext} from 'react'
import {colors, shadow, sizes, spacing} from '../constants/theme';
import ImagePreviewer from 'rc-image-previewer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Rating from '../components/Rating';
import { useNavigation } from '@react-navigation/native';
import Tags from '../components/Tags';
import AppButton from '../components/SmallComponents/AppButton';
import { Pressable } from 'react-native';
import ImageView from 'react-native-image-view';
import BackButton from '../components/SmallComponents/BackButton';


const DishDetailsScreen = ({ route }) => {
    const dish = route.params.dish;
    const navigation = useNavigation();


    const handleTagPress = (tag) => {
      alert(tag)
    }

    const handleEditPress = () => {
      alert("EDIT")
    }

  return (

    <SafeAreaView style={styles.container}>
              <View style={styles.imageBox}>
                    <ImagePreviewer source={dish.image ? {uri: dish.image} : require('../assets/image-placeholder.png')} style={styles.image} resizeMode="cover" />
                    {/* <ImageView
                        images={[{source: {uri: dish.image}}]}
                        imageIndex={0}
                        isTapZoomEnabled={false}
                        animationType={'fade'}
                    /> */}
              </View>
              <View style={styles.detailsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.7}>{dish.dishName}</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={handleEditPress}>
                        <FontAwesome5 name='edit' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', margin: spacing.s, alignItems: 'center'}} 
                onPress={handleEditPress}>

                    <FontAwesome5 name='map-marker-alt' size={25} color={dish.restaurant ? colors.primary : colors.gray} />
                    {dish.restaurant ?
                     <Text numberOfLines={1} style={{fontSize: sizes.h3, paddingHorizontal: spacing.m}}>{dish.restaurant}</Text> 
                     :
                     <Text style={{fontSize: sizes.h3, paddingHorizontal: spacing.m, color: colors.gray}}>Add Restaurant</Text> 
                     }
                     {dish.wouldHaveAgain && <MaterialCommunityIcons name='repeat' size={30} color={colors.green} />}
                    
                </View>
                {dish.rating ?
                  <View style={{backgroundColor: colors.blue, borderRadius: 15, marginVertical: spacing.s}}>
                    <Rating rating={dish.rating} fontSize={sizes.h3} iconSize={30} fontColor={colors.white} showText={true}/>
                  </View>
                  : 
                  <View style={{backgroundColor: colors.lightGray, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.s, paddingVertical: spacing.xs, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => alert('Add Rating')}>
                      <FontAwesome name='star-o' size={25} color={colors.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: colors.lightGray, padding: 5, borderRadius: 5}} onPress={() => alert('Add Rating')}>
                      <Text style={{fontSize: sizes.h3, fontWeight: '500'}} >Add Rating</Text>
                    </TouchableOpacity>
                  </View>
                }
                </View>
                <View style={styles.additionalBox}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: spacing.s}}>
                      {dish.dateText && 
                      <View style={styles.smallBox}>
                          <Text style={{paddingRight: spacing.s, fontSize: 15, fontWeight: '400', color: colors.darkGray}}>Date Eaten</Text>
                          <FontAwesome5 name='calendar' size={15} color={colors.darkGray} />
                          <Text style={{paddingLeft: spacing.s, fontSize: 15, fontWeight: '400', color: colors.darkGray}}>{dish.dateText}</Text>
                        </View>
                      }
                      {dish.price && 
                      <View style={styles.smallBox}>
                          <Text style={{paddingRight: spacing.s, fontSize: 15, fontWeight: '400', color: colors.darkGray}}>Price</Text>
                          <FontAwesome5 name='pound-sign' size={15} color={colors.darkGray} />
                          <Text style={{paddingLeft: spacing.s, fontSize: 15, fontWeight: '400', color: colors.darkGray, overflow: 'hidden'}}>{dish.price}</Text>
                        </View>
                      }
                    </View>
                    <Pressable onPress={handleEditPress}>
                      <Text style={[styles.comment, dish.comment ? {} : {color: colors.gray}]}>{dish.comment ? dish.comment : "Add a comment..."}</Text>
                    </Pressable>
                    
                    <View style={{flexDirection: 'row', marginVertical: spacing.s, justifyContent: 'space-evenly'}}>
                        {dish.tags ?
                          <Tags tags={dish.tags} bColor={colors.lightOrange} fColor={colors.white} handleTagPress={handleTagPress} wrap={false}/>
                        :
                          <View style={{height: 50, alignItems: 'center'}}>
                            <AppButton backgroundColor={colors.gray} color={colors.white} title={' ADD TAGS'} height={50} width={120}
                            icon={<FontAwesome name='plus' size={22} color='white' />}
                            onPress={() => {alert("DELETE")}}
                            fontSize={15}
                            />
                        </View>
                        }
                    </View>
                   
                      <View style={{height: 50, alignItems: 'center'}}>
                        <AppButton backgroundColor={colors.red} color={colors.white} title={'DELETE'} height={100} width={100}
                        icon={<MaterialCommunityIcons name='delete-outline' size={20} color='white' />}
                        onPress={() => {alert("ARE YOU SURE YOU WANT TO DELETE?")}}
                        fontSize={14}
                        />
                      </View>
                      {dish.updatedTime && 
                      <Text style={{position:'absolute', bottom: 0, left: 5, fontSize: 9, fontWeight: '300', color: colors.darkGray}}>
                        Last Updated: {dish.updatedTime.toDate().getDate() + "/" +  dish.updatedTime.toDate().getMonth() + "/" + dish.updatedTime.toDate().getFullYear()}
                      </Text>
                      }
                      
              </View>
              <BackButton iconColor={colors.white}/>

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
    paddingBottom: spacing.s,
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