import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import Posts from '../components/Posts'
import NavBar from '../components/NavBar';
import { STATUS_BAR_HEIGHT } from '../constants/theme';

const PostsScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
        <NavBar />
        <View style={styles.contentContainer}>
            <Text> PostsScreen </Text>
            <Posts restaurant="Wendy's" />
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

})