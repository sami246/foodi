import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../../constants/theme';
import Rating from '../Rating';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import AppBannerAd from "../Ads/AppBannerAd";

const CARD_WIDTH = sizes.width / 2 - (32);
const CARD_HEIGHT = sizes.height / 4 + 16;

const TwoDisplay = ({item}) => {
  const {handlePlaceholder, tagsFilter, sortFilter, wouldHaveAgainFilter} = useContext(DataContext);
  const navigation = useNavigation();
  let borderCol = colors.orange
  if(wouldHaveAgainFilter){
    borderCol = colors.green
  }
  else if(sortFilter){
    borderCol = colors.blue
  }
  else if(tagsFilter){
    borderCol = colors.gold
  }
  if(item.id){
  return (
    <TouchableOpacity style={styles.cardContainer} key={item.id} onPress={() => {navigation.navigate('Dish Details', {dish: item})}}>
        <View style={[styles.card, shadow.light, {borderColor: borderCol}]} >
            <View style={styles.imageBox}>
            <Image style={styles.image} source={item.image ? {uri: item.image} : handlePlaceholder(item.imagePlaceholder)} />
                <View style={{borderRadius: 8 ,position: 'absolute', bottom: 2, left: 5, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 3}}>
                    <Rating rating={item.rating} fontSize={10} iconSize={14} fontColor={colors.gold} showText={false} iconColor={colors.gold}/>
                </View>
                {item.wouldHaveAgain &&
                <View style={{borderRadius: 8 ,position: 'absolute', bottom: 2, right: 5, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 3}}>
                     <MaterialCommunityIcons name='repeat' size={20} color={colors.green} />
                </View>}
            </View>
            <View style={styles.footer}>
            <View style={styles.titleBox}>
                <Text numberOfLines={1} style={styles.title}>{item.dishName}</Text>
                <Text numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.9} style={styles.restaurant}>{item.restaurant ? item.restaurant : "N/A"}</Text>
            </View>
            {/* <FavoriteButton /> */}
            </View>
        </View>
    </TouchableOpacity>
  )}
  else{
    return(
      <View style={[styles.cardContainer,styles.card, {overflow: 'hidden', alignItems: 'center', borderColor: borderCol}]}>
        <AppBannerAd height={CARD_HEIGHT} width={CARD_WIDTH}/>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    // marginLeft: spacing.l,
    marginBottom: 14,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    borderWidth: 1.5,
    borderColor: colors.orange
    
  },
  imageBox: {
    width: CARD_WIDTH - 2.5,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius - 2,
    borderTopRightRadius: sizes.radius - 2,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH - 2.5,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 12,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 2,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
    
  },
  restaurant: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default TwoDisplay;