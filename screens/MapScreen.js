import { StyleSheet, View, Text, Image, PermissionsAndroid, Alert, Button, Location, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react';
import { colors, sizes, spacing, STATUS_BAR_HEIGHT} from '../constants/theme'
import { auth } from '../firebase';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Rating from '../components/Rating';
import { Gooogle_API_Key } from '../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { collection, query, where, onSnapshot, orderBy, limit, getDoc, doc,  } from "firebase/firestore";
import { firestoreDB } from '../firebase';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { markers, TagsData } from '../data';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width * 0.8;
const SPACING_FOR_CARD_INSET = (sizes.width * 0.1) - 10;


const MapScreen = ({ navigation }) => {
  const [user, setUser] = useState(auth.currentUser)
  const [data, setData] = useState(null)
  const [markerFocused, setMarkerFocused] = useState(0);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  let region = {
          latitude: 51.537430,
          longitude: -0.125250,
          latitudeDelta: 0.150,
          longitudeDelta: 0.150,
        }


  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        console.log({index})
        console.log({mapIndex})
        if(mapIndex !== index){
          mapIndex = index
          const {coordinate} = markers[index]

          setMarkerFocused(markers[index])
          _map.current.animateToRegion(
            {
              ... coordinate,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03
            },
            350 //millisecond time
          )
        }
      }, 100);
    })
  }, [mapAnimation])

  // const centerMap = useCallback(() => {
  //   if (markers) {
  //     _map.current?.fitToSuppliedMarkers(
  //       markers.map(m => m.id || ''),
  //       {
  //         animated: false,
  //         edgePadding: {
  //           top: 100,
  //           left: 100,
  //           right: 100,
  //           bottom: 100,
  //         },
  //       },
  //     );
  //   }
  // }, [markers]);

  const onMarkerPress = (marker, index) => {
    setMarkerFocused(marker)
    _map.current.animateToRegion(
      {
        ... marker.coordinate,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      },
      350 //millisecond time
    )
    let x = (index * CARD_WIDTH) + (index * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }
  

const _map = useRef(null);
const _scrollView = useRef(null);

  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      ref={_map}
      style={styles.map}
      region={region}
      customMapStyle={[]}
      userInterfaceStyle='dark'
      showsUserLocation={true}
    >
      {markers.map((marker, index) => (
              <Marker
              key={markerFocused.id === marker.id ? "," + index : index}
              coordinate={marker.coordinate}
              title={marker.name}
              description={marker.address}
              onPress={() => {onMarkerPress(marker, index)}}
              style={styles.marker}
              focusable={true}
              // image={require('../assets/foodIcons/dish-pin-icon.png')}
              pinColor={markerFocused.id === marker.id ? colors.orange : colors.blue}
              >
                      
                  <Callout 
                  tooltip
                  style={styles.plainView}>
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.name}>{marker.name}</Text>
                        <Text>{marker.address}</Text>
                        <Image 
                          style= {styles.image}
                          source = {marker.image}
                        />
                        <View style={styles.arrowBorder} />
                        <View style={styles.arrow} />
                      </View>
                    </View>
                  </Callout>
              </Marker>
      ))}

    </MapView>
    {/* Search Bar */}
    <View style={styles.searchBox}>
      <TextInput placeholder='Search Here' placeholderTextColor={'black'} autoCapitalize="none" style={{flex:1, padding:0}} />
      <Ionicons name='ios-search' size={20}/>
    </View>
    {/* Chip Tags */}
    <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} height={50} 
    style={styles.chipsScrollView} contentContainerStyle={{paddingRight: spacing.m, paddingLeft: spacing.s}}>
        {TagsData.map((item, index) => (
          <TouchableOpacity style={styles.chipsItem} key={index}>
            {item.icon}
            <Text> {item.label}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
    {/* Card Items */}
    <Animated.ScrollView 
      horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} style={styles.scrollView} ref={_scrollView}
      pagingEnabled snapToInterval={CARD_WIDTH + 20} snapToAlignment='center'  onMomentumScrollEnd={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: mapAnimation
              }
            }
          }
        ],
        {useNativeDriver: true}
      )}
      >
        {markers.map((marker,index) => (
            <View style={styles.card} key={index}>
              <Image 
              source={marker.image}
              style={styles.cardImage}
              resizeMode='cover'
              />
              <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                  <Rating rating={marker.rating * 2} showText={true} fontColor={colors.gold} iconColor={colors.gold}/>
                  {/* <Text numberOfLines={1} style={styles.cardDescription}>{marker.website}</Text> */}
                  <View style={styles.button}>
                      <TouchableOpacity onPress={() => {}} style={[styles.signIn, {borderColor: '#FF6247', borderWidth: 1}]}>
                        <Text style={[styles.textSign, {color: '#FF6347'}]}>ORDER NOW </Text>
                      </TouchableOpacity>
                  </View>
                  
              </View>
            </View>
        ))}
    </Animated.ScrollView>
  </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center'
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:15, 
    marginRight: spacing.s,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    borderColor: colors.blue,
    borderWidth: 1.5,
    textAlignVertical: 'center'
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: sizes.width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }

})