import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar';
import { STATUS_BAR_HEIGHT } from '../constants/theme';
import PostList from '../components/PostList';
import { TOP_PLACES, PLACES } from '../data';

const PostsScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <View style={styles.contentContainer}>
            <Text> All Your Posts </Text>
            <PostList list={PLACES} />
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
    top: STATUS_BAR_HEIGHT,
  },
  contentContainer : {
    flex: 10
  },

})