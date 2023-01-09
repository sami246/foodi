import React, { useEffect } from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import uuid from "uuid";

// import FavoriteButton from './FavoriteButton';
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

const CARD_WIDTH = sizes.width / 3 - 5;
const CARD_HEIGHT = 170;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.m;



const RecentList = ({list}) => {

  const handleDaysAgo = (date) => {
    var Difference_In_Time = new Date() - new Date(date.seconds * 1000);
    var Difference_In_Days = Math.floor((Difference_In_Time / (1000 * 3600 * 24)));
    return String(Difference_In_Days)
  }
  // Test Empty List
  // list = [list[0], list[1], list[2]]
  const {handlePlaceholder} = useContext(DataContext);
  const navigation = useNavigation();
  return (
    <ScrollView horizontal  snapToInterval={CARD_WIDTH_SPACING} decelerationRate="fast" style={styles.container} showsHorizontalScrollIndicator={false}>
      {list?.map((item, index) => {
        return (
          <TouchableOpacity key={item.id} onPress={() => {navigation.navigate('Dish Details', {dish: item})}} style={[styles.cardContainer, {marginLeft: index === 0 ? spacing.m : 0,
            marginRight: spacing.m,
          }]}>
            <View style={[styles.card, shadow.light]} >
              <View style={styles.imageBox}>
                <Image style={styles.image} source={item.image ? {uri: item.image} : handlePlaceholder(item.imagePlaceholder)} />
                <View style={{borderRadius: 8 ,position: 'absolute', top: 5, left: 5, backgroundColor: 'rgba(0,0,0,0.6)', padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                     {/* <MaterialCommunityIcons name='repeat' size={20} color={colors.green} /> */}
                     <FontAwesome5 name='calendar' size={11} color={colors.white} />
                     <Text style={{paddingLeft: 5, color: colors.white, fontSize: 9, textAlignVertical: 'center'}}>{item.dateText}</Text>
                </View>
                <View style={{borderRadius: 8 ,position: 'absolute', bottom: 5, right: 5, backgroundColor: 'rgba(0,0,0,0.6)', padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                     {/* <MaterialCommunityIcons name='repeat' size={20} color={colors.green} /> */}
                     <FontAwesome5 name='clock' size={11} color={colors.white} />
                     <Text style={{paddingLeft: 5, color: colors.white, fontSize: 9, textAlignVertical: 'center'}}>{handleDaysAgo(item.date)} days ago</Text>
                </View>

              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text numberOfLines={1} style={styles.title}>{item.dishName}</Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.9} style={styles.location}>{item.restaurant}</Text>
                </View>
                {/* <FavoriteButton /> */}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
          {list?.length < 5 && 
            <TouchableOpacity style={styles.cardContainer} key={uuid.v4()} onPress={() => {navigation.navigate('Add Dish')}}>
              <View style={[styles.card, shadow.light, {justifyContent: 'center', borderWidth: 3, borderColor: colors.lightGray, borderStyle: 'dashed'}]} >
                <FontAwesome5 name='plus' size={20} color={colors.lightGray} style={{alignSelf: 'center', marginBottom: 10}}/>
                <Text style={{color: colors.lightGray, alignSelf: 'center', fontSize: 16, fontWeight: '500'}}> Add a Dish </Text>
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
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  cardContainer: {
    marginBottom: 5,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    elevation: 3,
    shadowColor: '#52006A',
    // marginHorizontal: 7
    
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 50,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 50,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 8,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
    fontSize: sizes.body ,
    fontWeight: 'bold',
    color: colors.primary,
    
  },
  location: {
    fontSize: sizes.body -2,
    color: colors.lightGray,
  },
});

export default RecentList;