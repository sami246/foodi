import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Posts from '../components/Posts'

const PostsScreen = ({ navigation }) => {

  return (
    <View>
        <Text> PostsScreen </Text>
        <Posts />
        <Posts />
        <Posts />
    </View>
  )
}

export default PostsScreen
