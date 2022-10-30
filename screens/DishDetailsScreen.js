import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native'
import React from 'react'
import {colors, shadow, sizes, spacing, width} from '../constants/theme';
import { STATUS_BAR_HEIGHT } from '../constants/theme'
import ImagePreviewer from 'rc-image-previewer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const DishDetailsScreen = ({ route }) => {
    const dish = route.params.dish;
    console.log({dish})
    
  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.contentContainer}>
              <View style={styles.imageBox}>
                    <ImagePreviewer source={dish.image} style={styles.image} resizeMode="cover"/>

                {/* <Text>Something</Text> */}
              </View>
              <View style={styles.detailsBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{dish.title}</Text>
                    <TouchableOpacity style={styles.editIcon} onPress={() => alert("Edit")}>
                        <FontAwesome5 name='edit' size={30} color='black' />
                    </TouchableOpacity>
                </View>
                <Text style={styles.location}>{dish.location}</Text>
                <Text style={styles.rating}>{dish?.rating}/10</Text>
                <Text style={styles.description}>{dish.description}</Text>
              </View>
            </View>
    </SafeAreaView>
  )
}

export default DishDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer : {
    flex: 10,
  },
  titleBox: {
    flexDirection: 'row',
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: spacing.s,
    marginBottom: spacing.s
  }
  ,
  editIcon: {
    flex: 1,
    paddingLeft: 15
  },
  imageBox: {
    flex: 4,
    width: sizes.width,
    height: '100%',
    borderBottomLeftRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: sizes.width,
    height: '100%',
    resizeMode: 'cover'
  },
  detailsBox : {
    padding: 10,
    flex: 6,
    width: sizes.width,
  },
  title: {
    flex: 9,
    fontSize: sizes.h1,
    fontWeight: 'bold'
  },
  location: {
    fontSize: sizes.h2
  },
  rating: {
    fontSize: sizes.h3
  }
})