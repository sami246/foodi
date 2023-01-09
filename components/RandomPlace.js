import React from 'react'
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import uuid from "uuid";

const CARD_WIDTH = sizes.width - 40
const CARD_HEIGHT = 100

export default function RandomPlace() {
    const navigation = useNavigation();
    const item =  {
        id: 1212331,
        address: "9 Davenant St, London E1 5NB, UK",
        lat: 51.5184071,
        lng: -0.0656871,
        name: "The Urban Chocolatier Whitechapel",
        googlePriceLevel: 2,
        googleRating: 4.3,
        googleUrl: "https://maps.google.com/?cid=5901126532914094047",
        googleWebsite: "https://urbanchocolatier.com/",
        category: 3,
        userRating: 4,
        tags: ['Dessert'],
        links: ['https://www.instagram.com/reel/CldjP5DjITc/?igshid=YmMyMTA2M2Y=']
    }

    const handlePriceLevel = (level) => {
        const rows = [];
        for(let index = 0; index < level; index++) {
              rows.push(<FontAwesome5 key={uuid.v4()} style={{marginHorizontal: 2}} name='pound-sign' size={13} color={colors.green} />)  
        }
        return rows
    }

  return (
    // TODO Add Link
    <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('Restaurant Details', {restaurant: item})}} style={styles.cardContainer}>
        <View style={[styles.card, shadow.light]} >
            <View style={styles.titleBox}>
              <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.address}>{item.address}</Text>
            </View>
            <View style={styles.additionalBox}>
                {item.googlePriceLevel && 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {handlePriceLevel(item?.googlePriceLevel)}
                </View>
                }
                {item.googleRating && 
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 name='star' size={13} color={colors.gold} />
                <Text style={[styles.additionalText, {color: colors.gold}]}> {item.googleRating}</Text>
                </View>
                }
                
            </View>
        </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: spacing.s,
        alignItems: 'center'
      },
      card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        elevation: 3,
        shadowColor: '#52006A',
        // borderWidth: 2,
        // borderColor: colors.lightOrange
        
        // marginHorizontal: 7
        
      },
      titleBox: {
        alignItems: 'flex-start',
        marginHorizontal: 15,
        marginTop: 10
      },
      title: {
        marginBottom: 2,
        fontSize: sizes.h3,
        fontWeight: 'bold',
        color: colors.darkGray,
      },
      address: {
        fontSize: sizes.h3 - 3,
        color: colors.lightGray,
      },
      additionalBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 8
      },
      additionalText: {
        fontSize: sizes.h3 - 3,
        color: colors.primary,
      },
})