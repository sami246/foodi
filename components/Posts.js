import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Posts = () => {
  return (
    <View style={[styles.postContainer, styles.shadow]}>
      <Text style={{fontSize: 40, color: 'red', alignSelf: 'center' }}>Title</Text>
      <Text style={{fontSize: 20, color: 'red', alignSelf: 'center' }}>Image</Text>
      <Text style={{fontSize: 15, color: 'red', alignSelf: 'center' }}>Description</Text>
      <Text style={{fontSize: 15, color: 'red', alignSelf: 'center' }}>Rating</Text>
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
        height: 170,
        marginVertical: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    shadow: {
        elevation: 10,
        shadowColor: '#52006A',
    }

  })