import React, {useEffect, useContext} from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing, STATUS_BAR_HEIGHT} from '../../constants/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Rating from '../Rating';
import Tags from '../Tags';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DataContext } from '../../contexts/DataContext';
import AppBannerAd from "../Ads/AppBannerAd";



const CARD_WIDTH = sizes.width - (spacing.xl);
const CARD_HEIGHT = 250;
const IMAGE_HEIGHT = 160;


const OneDisplay = ({item, setFilterTags, filterTags}) => {

  const {handlePlaceholder, tagsFilter} = useContext(DataContext);
  
  const handleTagPress = (tag) => {
      setFilterTags([tag])
  }
  
  const navigation = useNavigation();
  if(item.id){
  return (
    <TouchableOpacity style={styles.cardContainer} key={item.id} onPress={() => {navigation.navigate('Post Detail', {dish: item})}}>
    <View style={[styles.card, shadow.light, {borderColor: tagsFilter ? colors.gold : colors.orange}]} >
      <View style={styles.imageBox}>
        <Image style={styles.image} source={item.image ? {uri: item.image} : handlePlaceholder(item.imagePlaceholder)} />
      </View>
      <View style={styles.footer}>
        {/* Rating */}
          <View style={{flexDirection: 'row', }}>
            <View style={{flex: 1.5}}>
                <Rating rating={item.rating} fontSize={13} iconSize={20} fontColor={colors.gold} showText={false} iconColor={colors.gold}/>
            </View>
            <View style={{flex: 1, alignItems: 'center', alignSelf: 'center', borderLeftWidth: 0.7, flexDirection: 'row', paddingLeft: 10, borderColor: colors.orange}}>
              <Text style={{fontSize: 11, paddingRight: 10, fontWeight: '500'}}>Would Have Again?</Text>
              {item.wouldHaveAgain ? 
              <MaterialCommunityIcons name='repeat' size={20} color={colors.green} />
              :
              <MaterialCommunityIcons name='repeat-off' size={20} color={colors.darkGray} />
            }
            </View>
            
          </View>
        {/* Dish Name */}
          <Text numberOfLines={1} style={styles.title} allowFontScaling={true} minimumFontScale={0.8}>{item.dishName}</Text>
          {/* Location + Date */}
          <View style={{flexDirection: 'row', marginBottom: spacing.s ,}}>
            <View style={[styles.halfBox, {flex: 3}]}>
                      {item.restaurantPlaceId ? 
                      <MaterialCommunityIcons name='google-maps' size={16} color={colors.green}/> 
                      :
                      <MaterialCommunityIcons name='map-marker' size={16} color={colors.primary} />
                      }
                      <Text numberOfLines={1} allowFontScaling={true} minimumFontScale={0.8} style={[styles.halfBoxText, {marginLeft: -4}]}>{item.restaurant}</Text>
            </View>

            {item.dateText && 
            <View style={[styles.halfBox,, {flex: 2}]}>
            <FontAwesome5 name='calendar' size={13} color={colors.primary} />
            <Text numberOfLines={1} allowFontScaling={true} minimumFontScale={0.8} style={styles.halfBoxText}>{item.dateText}</Text>
            </View>
            }
            {item.price &&                     
            <View style={[styles.halfBox,, {flex: 1}]}>
              <FontAwesome5 name='pound-sign' size={13} color={colors.primary} />
              <Text numberOfLines={1} allowFontScaling={true} minimumFontScale={0.8} style={styles.halfBoxText}>{item.price}</Text>
            </View>
            }
          </View>
          <View style={{flexDirection: 'row', marginBottom: spacing.s, justifyContent: 'space-around'}}>
              <Tags tags={item.tags} bColor={colors.lightOrange} fColor={colors.white} handleTagPress={handleTagPress} wrap={true} filterTags={filterTags} tagIconColor={colors.white}/>
          </View>
        {/* <FavoriteButton /> */}
      </View>
    </View>
  </TouchableOpacity>
  );}
  else{
    return(
      <View style={[styles.cardContainer, styles.card]}>
        <AppBannerAd height={150} width={CARD_WIDTH}/>
      </View>
    )
  }
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: spacing.m,
        overflow: 'hidden',
        elevation: 5,
      },
      card: {
        width: CARD_WIDTH,
        overflow: 'hidden',
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        borderWidth: 2,
        borderColor: colors.orange
      },
      imageBox: {
        width: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        height: IMAGE_HEIGHT,
        borderTopLeftRadius: sizes.radius - 5,
        borderTopRightRadius: sizes.radius,
        overflow: 'hidden',
      },
      image: {
        width: CARD_WIDTH,
        height: IMAGE_HEIGHT,
        resizeMode: 'cover',
      },
      footer: {
        // flexDirection: 'row',
        marginTop: 6,
        marginLeft: 16,
        marginRight: 10,
      },
      title: {
        borderBottomWidth: 1.5,
        borderColor: colors.brown,
        paddingBottom: 3,
        paddingHorizontal: 10,
        marginTop: spacing.xs,
        marginBottom: spacing.s,
        fontSize: sizes.body,
        fontWeight: '900',
        color: colors.brown,
        alignSelf: 'center'
      },
      halfBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        alignItems: 'center',
    
      },
      halfBoxText: {
        flex: 2,
        paddingLeft: spacing.s,
        textAlignVertical: 'center',
        fontSize: 13,
        fontWeight: '500'
      }
});

export default OneDisplay;