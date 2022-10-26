import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Posts from '../components/Posts'

const Dish = ({ navigation, rating, cuisine, comment, date, wouldHaveAgain }) => {

  return (
    <View>
        <Image
        style={styles.dishImage}
        resize="contain"
        source={{uri: 'https://www.londonxlondon.com/wp-content/uploads/2021/08/Black-Bear-Burger-Boxpark.jpeg'}}
        />
        <Text style={{fontSize: 15, color: 'red', alignSelf: 'center' }}>{comment}</Text>
        <Text style={{fontSize: 15, color: 'red', alignSelf: 'flex-end' }}>Rating: {rating}</Text>
        <Text style={{fontSize: 15, color: 'green', alignSelf: 'flex-end' }}>Would Have Again: {wouldHaveAgain ? "YES" : "NO"}</Text>
    </View>
  )
}

export default Dish
const styles = StyleSheet.create({
    dishImage : {
        width: 170,
        height: 170
    }
})