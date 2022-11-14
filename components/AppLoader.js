import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Lottie source={require('../assets/loading/orange spoon loading.json')} autoPlay loop speed={0.8} />
      {/* <Lottie source={{uri: 'https://assets5.lottiefiles.com/packages/lf20_tsxbtrcu.json'}} autoPlay loop /> */}
    </View>
  )
}

export default AppLoader

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: 1
    }
})