import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { sizes } from '../../constants/theme';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const AppBannerAd = ({height}) => {
  return (
    <View style={styles.container}>
        <BannerAd

        unitId={TestIds.BANNER}
        size={`${sizes.width- 10}x${height}`}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
    />
    </View>
  )
}

export default AppBannerAd

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: 'center'
  }
})