import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Rating from './Rating';
// import FavoriteButton from './FavoriteButton';

const CARD_WIDTH = sizes.width - (spacing.xl);
const CARD_HEIGHT = 250;

const PostList = ({list}) => {

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {list.map((item, index) => {
        console.log({item})
        return (
          <TouchableOpacity style={styles.cardContainer} key={item.id} onPress={() => {navigation.navigate('Post Detail', {dish: item})}}>
            <View style={[styles.card, shadow.light]} >
              <View style={styles.imageBox}>
                <Image style={styles.image} source={item.image ? {uri: item.image} : null} />
              </View>
              <View style={styles.footer}>
                  <View style={{marginVertical: spacing.xs}}>
                      <Rating rating={item.rating} fontSize={sizes.body} iconSize={17} fontColor={colors.gray}/>
                  </View>
                  <Text numberOfLines={1} style={styles.title} allowFontScaling={true} minimumFontScale={0.8}>{item.dishName}</Text>
                  {/* <Text numberOfLines={1} style={styles.location}>{item.restaurant}</Text> */}
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <FontAwesome5 name='map-marker-alt' size={15} color={colors.primary} />
                    <Text style={{fontSize: sizes.h4, paddingLeft: spacing.s}}>{item.restaurant}</Text>
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
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    borderWidth: 1.5,
    borderColor: colors.orange
    
  },
  imageBox: {
    width: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
    height: CARD_HEIGHT - 90,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 90,
    resizeMode: 'cover',
  },
  footer: {
    // flexDirection: 'row',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
    
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default PostList;