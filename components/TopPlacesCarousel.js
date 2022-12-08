import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import Rating from './Rating';
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';


const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopPlacesCarousel = ({list}) => {
  const {handlePlaceholder} = useContext(DataContext);
  const navigation = useNavigation();

  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        if(item.rating != null){
          return (
            <TouchableOpacity
              onPress={() => {navigation.navigate('Post Detail', {dish: item})}}
              style={{
                marginLeft: index === 0 ? spacing.l : 0,
                marginRight: spacing.l,
              }}>
              <View style={[styles.card, shadow.dark]}>
                <View style={styles.imageBox}>
                  <Image source={item.image ? {uri: item.image} : handlePlaceholder()} style={[styles.image, {}]} />
                </View>
                <View style={styles.titleBox}>
                  <Text numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.8}  style={[styles.title, styles.textShadow]}>{item.dishName}</Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.8} style={[styles.location, styles.textShadow]}>{item.restaurant}</Text>
                  <View style={[styles.textShadow, {alignItems: 'flex-start'}]}>
                    <Rating rating={item.rating} fontSize={10} iconSize={13} fontColor={colors.gold} showText={false}/>
                  </View>
                  
                </View>
              </View>
            </TouchableOpacity>
          );
        }
       
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginTop: 10,
    elevation: 10,
    shadowColor: '#52006A',
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
    width: CARD_WIDTH - 32,
    overflow: 'hidden'
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
    
    overflow: 'hidden'
  },
  location: {
    overflow: 'hidden',
    fontSize: sizes.h3,
    color: colors.white,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -2, height: 1},
    textShadowRadius: 10
  },
  rating : {
    color: colors.light,
    fontSize: sizes.body,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
});

export default TopPlacesCarousel;