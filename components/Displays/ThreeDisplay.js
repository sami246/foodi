import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../../constants/theme';
import Rating from '../Rating';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import AppBannerAd from "../Ads/AppBannerAd";


const CARD_WIDTH = sizes.width / 3 - (21);
const CARD_HEIGHT = sizes.height / 5.2;

const ThreeDisplay = ({item}) => {
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
                    <Rating rating={item.rating} fontSize={10} iconSize={11} fontColor={colors.gold} showText={false} iconColor={colors.gold}/>
                </View>
                {item.wouldHaveAgain &&
                <View style={{borderRadius: 8 ,position: 'absolute', bottom: 2, right: 5, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 3}}>
                     <MaterialCommunityIcons name='repeat' size={17} color={colors.green} />
                </View>}
            </View>
            <View style={styles.footer}>
            <View style={styles.titleBox}>
                <Text numberOfLines={1} style={styles.title}>{item.dishName}</Text>
                <Text numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.8} style={styles.restaurant}>{item.restaurant ? item.restaurant : "N/A"}</Text>
            </View>
            {/* <FavoriteButton /> */}
            </View>
        </View>
    </TouchableOpacity>
  );  }
  else if(item.ad){
    return(
      <View style={[styles.cardContainer, styles.card, {width: sizes.width - (35), height: sizes.height / 5.2, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch', borderColor: borderCol}]}>
        <AppBannerAd height={105} width={sizes.width - (30)}/>
      </View>
    )
  }
  else{
    return(
      <View></View>
    )
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
    marginHorizontal: spacing.xs
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    borderWidth: 1.5,
    borderColor: colors.orange,
    overflow:'hidden'
    
  },
  imageBox: {
    width: CARD_WIDTH - 2.5,
    height: CARD_HEIGHT - 50,
    borderTopLeftRadius: sizes.radius - 2,
    borderTopRightRadius: sizes.radius - 2,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH - 2.5,
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
    marginVertical: 2,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
    
  },
  restaurant: {
    fontSize: sizes.body - 2,
    color: colors.lightGray,
  },
});

export default ThreeDisplay;