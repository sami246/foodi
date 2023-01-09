import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const AppBannerAd = ({height, width}) => {
  return (
    <View style={styles.container}>
        <BannerAd

        unitId={TestIds.BANNER}
        size={`${width}x${height}`}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            keywords: ['food', 'restaurants', 'events'],
        }}
    />
    </View>
  )
}

export default AppBannerAd

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
})