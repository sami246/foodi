import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React, {useState} from 'react'
import NavBar from '../components/NavBar';
import { STATUS_BAR_HEIGHT } from '../constants/theme';
import PostList from '../components/PostList';
import { TOP_PLACES, PLACES } from '../data';
import { dishesData } from '../firebase';
import AddOverlayButton from '../components/AddOverlayButton';



const PostsScreen = ({ navigation }) => {
  console.log({dishesData})

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <AddOverlayButton />
        <View style={styles.contentContainer}>
          <PostList list={dishesData} />

            {/* <Text> All Your Posts </Text>
            <PostList list={PLACES} /> */}
        </View>
    </SafeAreaView>
  )
}

export default PostsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer : {
    flex: 10
  },

})