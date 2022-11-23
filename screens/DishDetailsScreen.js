import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native'
import React from 'react'
import {colors, shadow, sizes, spacing} from '../constants/theme';
import ImagePreviewer from 'rc-image-previewer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Rating from '../components/Rating';
import { useNavigation } from '@react-navigation/native';
import AppLoader from '../components/AppLoader';


const DishDetailsScreen = ({ route }) => {
    const dish = route.params.dish;
    const navigation = useNavigation();
    console.log({dish})
  return (

    <SafeAreaView style={styles.container}>
         <View style={styles.contentContainer}>
              <View style={styles.imageBox}>
                    <ImagePreviewer source={{uri: dish.image}} style={styles.image} resizeMode="cover"/>
              </View>
              <View style={styles.detailsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title} adjustsFontSizeToFit={true} numberOfLines={1} minimumFontScale={0.7}>{dish.dishName}</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('Settings', {dish: dish})}>
                        <FontAwesome5 name='edit' size={30} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', margin: spacing.s}}>
                    <FontAwesome5 name='map-marker-alt' size={25} color={colors.primary} />
                    <Text style={{fontSize: sizes.h3, paddingHorizontal: spacing.m}}>{dish.restaurant}</Text>
                </View>

                
                {dish.rating ?
                  <View style={{backgroundColor: colors.blue, borderRadius: 15, marginVertical: spacing.s}}>
                    <Rating rating={dish.rating} fontSize={sizes.h3} iconSize={25} fontColor={colors.white} showText={true}/>
                  </View>

                  : 

                  <View style={{backgroundColor: colors.lightGray, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.s, paddingVertical: spacing.xs, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => alert('Add Rating')}>
                      <FontAwesome name='star-o' size={25} color={colors.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: colors.lightGray, padding: 5, borderRadius: 5}} onPress={() => alert('Add Rating')}>
                      <Text>Add Rating</Text>
                    </TouchableOpacity>
                  </View>
                }
                    
                
                
                <Text style={styles.comment}>{dish.comment}</Text>
              </View>
            </View>
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
  contentContainer : {
    flex: 10,
  },
  titleBox: {
    flexDirection: 'row',
    borderColor: colors.blue,
    borderBottomWidth: 1,
    paddingBottom: spacing.s,
    marginBottom: spacing.s
  }
  ,
  editIcon: {
    flex: 1,
    paddingLeft: 15
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
    padding: 10,
    flex: 6,
    width: sizes.width,
  },
  title: {
    flex: 9,
    fontSize: sizes.h1,
    fontWeight: 'bold'
  },
  rating: {
    fontSize: sizes.h3
  }
})