import React, { useEffect } from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import uuid from "uuid";

// import FavoriteButton from './FavoriteButton';
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

const CARD_WIDTH = sizes.width / 2.5;
const CARD_HEIGHT = 80;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.m;

const WantToGoList = ({list}) => {
    console.log({list})

  // Test Empty List
  // list = [list[0], list[1], list[2]]
  const {handlePlaceholder} = useContext(DataContext);
  const navigation = useNavigation();
  return (
    <ScrollView horizontal  snapToInterval={CARD_WIDTH_SPACING} decelerationRate="fast" style={styles.container} showsHorizontalScrollIndicator={false}>
      {list?.map((item, index) => {
        return (
          <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('Post Detail', {dish: item})}} style={[styles.cardContainer, {marginLeft: index === 0 ? spacing.m : 0,
            marginRight: spacing.m,
          }]}>
            <View style={[styles.card, shadow.light]} >
                <View style={styles.titleBox}>
                  <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
                  <Text numberOfLines={1} style={styles.address}>{item.address}</Text>
                </View>
                <View style={styles.additionalBox}>
                    {item.priceLevel && 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5 name='pound-sign' size={13} color={colors.green} />
                    <Text style={[styles.additionalText, {color: colors.green}]}> Level: {item.priceLevel}</Text>
                    </View>
                    }
                    {item.rating && 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5 name='star' size={13} color={colors.gold} />
                    <Text style={[styles.additionalText, {color: colors.gold}]}> {item.rating}</Text>
                    </View>
                    }
                    
                </View>
            </View>
          </TouchableOpacity>
        );
      })}
          {list?.length < 5 && 
            <TouchableOpacity style={styles.cardContainer} key={uuid.v4()} onPress={() => {console.log("TODO: Add edit to restauarnts")}}>
              <View style={[styles.card, shadow.light, {justifyContent: 'center', borderWidth: 3, borderColor: colors.lightGray, borderStyle: 'dashed'}]} >
                <FontAwesome5 name='plus' size={20} color={colors.lightGray} style={{alignSelf: 'center', marginBottom: 10}}/>
                <Text style={{color: colors.lightGray, alignSelf: 'center', fontSize: 16, fontWeight: '500'}}> Add a place you want to go </Text>
              </View>
            </TouchableOpacity>
          }
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginBottom: 15,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    // marginHorizontal: 7
    
  },
  titleBox: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginTop: 10
  },
  title: {
    marginBottom: 2,
    fontSize: sizes.body - 1,
    fontWeight: 'bold',
    color: colors.primary,
  },
  address: {
    fontSize: sizes.body - 3,
    color: colors.lightGray,
  },
  additionalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 8
  },
  additionalText: {
    fontSize: sizes.body - 3,
    color: colors.primary,
  },
});

export default WantToGoList;