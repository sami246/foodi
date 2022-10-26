import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Dish from './Dish'
import { FlatList } from 'react-native-gesture-handler'

const Posts = ({restaurant}) => {
  const dishes = [
        { rating : 7,
          cuisine :"Burger",
          comment : "Delightful, best i've had",
          date : "29/10/1997",
          wouldHaveAgain : true
        },
        { rating : 2,
          cuisine : "Dessert",
          comment : "mmmm",
          date : "29/10/1997",
        wouldHaveAgain : false 
      }

        ]

  return (
    <View style={[styles.postContainer, styles.cardShadow]}>
      <Text>{restaurant}</Text>

      <FlatList 
              data={dishes}
              keyExtractor={i => i.id}
              renderItem={(itemData) => {
                  return <Dish 
                        rating={itemData.item.rating}
                        // Need to change
                        cuisine ={itemData.item.cuisine}
                        comment={itemData.item.comment}
                        date={itemData.item.date}
                        wouldHaveAgain={itemData.item.wouldHaveAgain}
                        />
                }}
            
      />
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        borderRadius: 13,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: 250,
        marginVertical: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    cardShadow: {
        elevation: 10,
        shadowColor: '#52006A',
    }

  })