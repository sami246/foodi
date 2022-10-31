import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FavoriteButton from './FavoriteButton';

const CARD_WIDTH = sizes.width - (spacing.xl);
const CARD_HEIGHT = 250;

const PostList = ({list}) => {

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity style={styles.cardContainer} key={item.id} onPress={() => {navigation.navigate('Post Detail', {dish: item})}}>
            <View style={[styles.card, shadow.light]} >
              <View style={styles.imageBox}>
                <Image style={styles.image} source={item.image} />
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <FontAwesome name='star' size={25} color={colors.gold} />
                  <Text numberOfLines={1} style={styles.title} allowFontScaling={true} minimumFontScale={0.8}>{item.title}</Text>
                  <Text numberOfLines={1} style={styles.location}>{item.location}</Text>
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
  },
  cardContainer: {
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
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
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