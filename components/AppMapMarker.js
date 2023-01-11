import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps';
import { colors } from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AppMapMarker = ({mapIconColor, item, onPress, onDeselect}) => {
  return (
    <Marker
    key={item.id}
    onPress={onPress}
    onDeselect={onDeselect}
    coordinate={{
      longitude: item.coordinate.longitude,
      latitude: item.coordinate.latitude
    }}
    >
      <View style={styles.circle}>
        
        <View style={[styles.core, {backgroundColor: mapIconColor}]} >
            {item.category == 1 && <AntDesign name='pushpin' size={11} color={colors.white} style={{alignSelf: 'center'}}/>}
            {item.category == 2 && <MaterialCommunityIcons name='check-bold' size={12} color={colors.white} style={{alignSelf: 'center'}}/>}
            {item.category == 3 && <FontAwesome name='star' size={12} color={colors.white} style={{alignSelf: 'center'}}/>}
            {item.category == null && <MaterialCommunityIcons name='minus-thick' size={12} color={colors.white} style={{alignSelf: 'center'}}/>}
        </View>
        <View style={styles.stroke} />
      </View>
    </Marker>
  )
}

export default AppMapMarker

const styles = StyleSheet.create({

circle: {
    width: 21,
    height: 21,
    borderRadius: 50,
  },
  stroke: {
    backgroundColor: "white",
    borderRadius: 50,
    width: "100%",
    height: "100%",
    zIndex: 1,

  },
  core: {
    backgroundColor: colors.blue,
    width: 19,
    height: 19,
    position: "absolute",
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderRadius: 50,
    zIndex: 2,
    justifyContent: 'center'
  }})