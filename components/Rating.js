import React, { useEffect, useState } from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {sizes, spacing, colors} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Rating = ({rating}) => {
    const [ratingsArray, setRatingsArray] = useState([])

    useEffect(() => {
        let wholeStar = Math.floor(rating/2)
        let halfStar = rating % 2
        let noStar = 5 - (wholeStar + halfStar)

        const rows = [];
        for (let a = 0; a < wholeStar; a++) {
            rows.push(<FontAwesome key={'W' + a} name='star' size={25} color={colors.gold} />);
        }
        for (let b = 0; b < halfStar; b++) {
            rows.push(<FontAwesome key={'H' + b} name='star-half-full' size={25} color={colors.gold} />);
        }
        for (let c = 0; c < noStar; c++) {
            rows.push(<FontAwesome key={'N' + c} name='star-o' size={25} color={colors.gold} />);
        }
        setRatingsArray(rows)
    }, [])
  

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.s}}>
            <Text style={{fontSize: sizes.h3, fontWeight: '500', color: colors.white}}>{rating}/10</Text>
            {ratingsArray}
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Rating;