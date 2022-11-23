import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Rating from './Rating';
import Tags from './Tags';
// import FavoriteButton from './FavoriteButton';

const CARD_WIDTH = sizes.width - (spacing.xl);
const CARD_HEIGHT = 250;
const IMAGE_HEIGHT = 160;

const PostList = ({list}) => {

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity style={styles.cardContainer} key={item.id} onPress={() => {navigation.navigate('Post Detail', {dish: item})}}>
            <View style={[styles.card, shadow.light]} >
              <View style={styles.imageBox}>
                <Image style={styles.image} source={item.image ? {uri: item.image} : null} />
              </View>
              <View style={styles.footer}>
                {/* Rating */}
                  <View style={{}}>
                      <Rating rating={item.rating} fontSize={13} iconSize={17} fontColor={colors.gold} showText={false}/>
                  </View>
                {/* Dish Name */}
                  <Text numberOfLines={1} style={styles.title} allowFontScaling={true} minimumFontScale={0.8}>{item.dishName}</Text>
                  {/* Location + Date */}
                  <View style={{flexDirection: 'row', marginBottom: spacing.s}}>
                    {item.restaurant && 
                    <View style={[styles.halfBox, {flex: 3}]}>
                    <FontAwesome5 name='map-marker-alt' size={13} color={colors.primary} />
                    <Text numberOfLines={1} allowFontScaling={true} minimumFontScale={0.8} style={styles.halfBoxText}>{item.restaurant}</Text>
                    </View>
                    }
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
                      <Tags tags={item.categories} bColor={colors.lightOrange} fColor={colors.white}/>
                  </View>
                {/* <FavoriteButton /> */}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    marginBottom: spacing.m,
    marginTop: spacing.m,
  },
  cardContainer: {
    marginBottom: spacing.l,
    overflow: 'hidden'
  },
  card: {
    width: CARD_WIDTH,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    borderWidth: 1.5,
    borderColor: colors.orange
    
  },
  imageBox: {
    width: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: sizes.radius,
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
  },
  halfBoxText: {
    flex: 2,
    paddingLeft: spacing.s,
    textAlignVertical: 'center',
    fontSize: 13,
  }
});

export default PostList;