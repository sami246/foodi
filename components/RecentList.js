import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
// import FavoriteButton from './FavoriteButton';
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;



const RecentList = ({list}) => {
  const {handlePlaceholder} = useContext(DataContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity style={styles.cardContainer} key={item.id} onPress={() => {navigation.navigate('Post Detail', {dish: item})}}>
            <View style={[styles.card, shadow.light]} >
              <View style={styles.imageBox}>
                <Image style={styles.image} source={item.image ? {uri: item.image} : handlePlaceholder()} />
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text numberOfLines={1} style={styles.title}>{item.dishName}</Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.7} style={styles.location}>{item.restaurant}</Text>
                </View>
                {/* <FavoriteButton /> */}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 12,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 3,
    fontSize: sizes.body + 2,
    fontWeight: 'bold',
    color: colors.primary,
    
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default RecentList;