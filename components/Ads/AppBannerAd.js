import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { sizes } from '../../constants/theme';


const AppBannerAd = ({height}) => {
  return (
    <>
        <BannerAd
        unitId={TestIds.BANNER}
        size={`${sizes.width}x${height}`}
        requestOptions={{
            requestNonPersonalizedAdsOnly: true,
        }}
    />
    </>
  )
}

export default AppBannerAd

const styles = StyleSheet.create({
})