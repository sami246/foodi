import React, { useEffect, useState } from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {sizes, spacing, colors, shadow} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Rating = ({rating, iconSize, fontSize, fontColor, showText}) => {
    const [ratingsArray, setRatingsArray] = useState([])

    useEffect(() => {
        let wholeStar = Math.floor(rating/2)
        let halfStar = rating % 2
        let noStar = 5 - (wholeStar + halfStar)

        const rows = [];
        for (let a = 0; a < wholeStar; a++) {
            rows.push(<FontAwesome key={'W' + a} name='star' size={iconSize} color={colors.gold} />);
        }
        for (let b = 0; b < halfStar; b++) {
            rows.push(<FontAwesome key={'H' + b} name='star-half-full' size={iconSize} color={colors.gold} />);
        }
        for (let c = 0; c < noStar; c++) {
            rows.push(<FontAwesome key={'N' + c} name='star-o' size={iconSize} color={colors.gold} />);
        }
        setRatingsArray(rows)
    }, [])
  
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.xs, alignItems: 'center'}}>
            {rating && showText && 
            <Text style={{fontSize: fontSize, fontWeight: '500', color: fontColor}}>{rating}/10</Text> 
            }
            {!rating && showText &&
            <Text style={{fontSize: fontSize, fontWeight: '500', color: colors.lightGray}}>No Rating</Text>
            }
            
            {ratingsArray}
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Rating;