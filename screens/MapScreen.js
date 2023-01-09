import { StyleSheet, View, Text, Image, PermissionsAndroid, Alert, Button, TextInput, ScrollView, TouchableOpacity, Animated } from 'react-native'
import React, {  useEffect, useRef, useContext, useCallback } from 'react';
import { colors, sizes, spacing, STATUS_BAR_HEIGHT} from '../constants/theme'
import { auth } from '../firebase';
import { useState } from 'react';
import Rating from '../components/Rating';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { markers, TagsData } from '../data';
import { DataContext } from '../contexts/DataContext';
import AddOverlayButton from '../components/SmallComponents/AddOverlayButton';

const CARD_HEIGHT = 220;
const CARD_WIDTH = sizes.width * 0.8;
const SPACING_FOR_CARD_INSET = (sizes.width * 0.1) - 10;


const MapScreen = ({ navigation }) => {
  const {mapFilterCategory, setMapFilterCategory, fetchAllMapData, mapData} = useContext(DataContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [markerFocused, setMarkerFocused] = useState(0);

  useEffect(() => {
    onRefresh();
  }, [])

  useEffect(() => {
    fetchAllMapData();
  }, [mapFilterCategory])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {fetchAllMapData().then(() => {
      setRefreshing(false)
    }).catch((error) => alert(error))})

  }, []);


  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  // TODO Add Initial Region based on user Location
  let region = {
          latitude: 51.537430,
          longitude: -0.125250,
          latitudeDelta: 0.150,
          longitudeDelta: 0.150,
        }

        // useEffect(() => {
        //   (async () => {
        //     let { status } = await Location.requestPermissionsAsync();
        //     if (status !== "granted") {
        //       setErrorMsg("Permission to access location was denied");
        //     }
      
        //     let location = await Location.getCurrentPositionAsync({});
        //     setLocation(location);
      
        //     setMapRegion({
        //       longitude: location.coords.longitude,
        //       latitude: location.coords.latitude,
        //       longitudeDelta: 0.0922,
        //       latitudeDelta: 0.0421
        //     });
        //   })();
        // }, []);

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
  //   if (mapData) {
  //     _map.current?.fitToSuppliedMarkers(
  //       mapData.map(m => m.id || ''),
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
  // }, [mapData]);

  const onMarkerPress = (marker, index) => {
    console.log(marker)
    setMarkerFocused(marker)
    _map.current.animateToRegion(
      {
        ... marker.coordinate,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      },
      350 //millisecond time
    )
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
      userInterfaceStyle='dark'
      showsUserLocation={true}
      followsUserLocation={true}
      showsPointsOfInterest={false}
      showsBuildings={false}
    >
      {mapData.map((item, index) => {
        let mapIconColor = colors.brown
        if (item.category == 2){
          mapIconColor = colors.darkBlue
        }
        else if (item.category === 1){
          mapIconColor = colors.darkGreen
        }
        else if (item.category === 3){
          mapIconColor = colors.gold
        }
        return (
          <Marker
          key={item.id}
          onPress={() => {onMarkerPress(item, index)}}
          onDeselect={() => {setMarkerFocused(null)}}
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
      })}

    </MapView>
    {/* Search Bar */}
    {/* <View style={styles.searchBox}>
      <TextInput placeholder='Search Here' placeholderTextColor={'black'} autoCapitalize="none" style={{flex:1, padding:0}} />
      <Ionicons name='ios-search' size={20}/>
    </View> */}
    {/* Chip Categories */}
    <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} height={50} 
    style={styles.chipsCatScrollView} contentContainerStyle={{paddingRight: spacing.m}}>
          {mapFilterCategory === 1
          ?
          <TouchableOpacity style={[styles.chipsCatItem, {borderColor: colors.white, backgroundColor: colors.darkGreen}]} key={"Want to Go"}
          onPress={() => {setMapFilterCategory(null)}}
          >
          <AntDesign name='pushpin' size={11} color={colors.white} style={{alignSelf: 'center'}}/>
          <Text style={{textAlignVertical: 'top', fontSize: 13, color: colors.white, fontWeight: 'bold'}}> Want to Go</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.chipsCatItem, {borderColor: colors.darkGreen}]} key={"Want to Go"}
          onPress={() => {setMapFilterCategory(1)}}
          >
          <AntDesign name='pushpin' size={11} color={colors.darkGreen} style={{alignSelf: 'center'}}/>
          <Text style={{textAlignVertical: 'top', fontSize: 13}}> Want to Go</Text>
          </TouchableOpacity>
          }
          {mapFilterCategory === 2
          ?
          <TouchableOpacity style={[styles.chipsCatItem, {borderColor: colors.white, backgroundColor: colors.darkBlue,}]} key={"Already Been"}
          onPress={() => {setMapFilterCategory(null)}}
          >
            <MaterialCommunityIcons name='check-bold' size={12} color={colors.white} style={{alignSelf: 'center'}}/>
            <Text style={{textAlignVertical: 'top', fontSize: 13, color: colors.white, fontWeight: 'bold'}}> Already Been</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.chipsCatItem, {borderColor: colors.darkBlue}]} key={"Already Been"}
          onPress={() => {setMapFilterCategory(2)}}
          >
            <MaterialCommunityIcons name='check-bold' size={12} color={colors.darkBlue} style={{alignSelf: 'center'}}/>
            <Text style={{textAlignVertical: 'top', fontSize: 13}}> Already Been</Text>
           </TouchableOpacity>
          }
          {mapFilterCategory === 3
          ?
          <TouchableOpacity style={[styles.chipsCatItem, {borderColor: colors.white, backgroundColor: colors.gold}]} key={"Favourite"}
          onPress={() => {setMapFilterCategory(null)}}
          >
            <FontAwesome name='star' size={12} color={colors.white} style={{alignSelf: 'center'}}/>
            <Text style={{textAlignVertical: 'top', fontSize: 13, color: colors.white, fontWeight: 'bold'}}> Favourite</Text>
           </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.chipsCatItem, {borderColor: colors.gold}]} key={"Favourite"}
          onPress={() => {setMapFilterCategory(3)}}
          >
            <FontAwesome name='star' size={12} color={colors.gold} style={{alignSelf: 'center'}}/>
            <Text style={{textAlignVertical: 'top', fontSize: 13}}> Favourite</Text>
          </TouchableOpacity>
          }

    </ScrollView>
    {/* Chip Tags */}
    <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} height={50} 
    style={styles.chipsTagsScrollView} contentContainerStyle={{paddingRight: spacing.m}}>
        {TagsData.map((item, index) => (
          <TouchableOpacity style={styles.chipsTagItem} key={index}>
            <View style={styles.chipsIcon}>{item.icon}</View>
            {/* TODO If pressed then show label */}
            {/* <Text style={{textAlignVertical: 'top', fontSize: 13, marginLeft: 3}}> {item.label}</Text> */}
          </TouchableOpacity>
        ))}
    </ScrollView>
    {/* Card Items */}
    {/* <Animated.ScrollView 
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
                  <Rating rating={marker.googleRating * 2} showText={true} fontColor={colors.gold} iconColor={colors.gold}/>
                  <View style={styles.button}>
                      <TouchableOpacity onPress={() => {}} style={[styles.signIn, {borderColor: '#FF6247', borderWidth: 1}]}>
                        <Text style={[styles.textSign, {color: '#FF6347'}]}>ORDER NOW </Text>
                      </TouchableOpacity>
                  </View>
                  
              </View>
            </View>
        ))}
    </Animated.ScrollView> */}
    <AddOverlayButton dish={false} buttonColor={colors.darkBlue}/>
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
    marginTop: Platform.OS === 'ios' ? 40 : 8, 
    marginLeft: 10,
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
    alignItems: 'center',
  },
  chipsTagsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 60, 
    paddingHorizontal:10
  },
  chipsCatScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 15, 
    paddingHorizontal:10,
  },
  chipsIcon: {
    
  },
  chipsTagItem: {
    flexDirection:"row",
    backgroundColor:colors.white,  
    borderRadius:20,
    paddingHorizontal: 9, 
    marginRight: spacing.s,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    borderColor: colors.blue,
    borderWidth: 1.5,
    textAlignVertical: 'center',
    paddingVertical: 2,
    alignItems: 'center'
  },
  chipsCatItem: {
    flexDirection:"row",
    backgroundColor: colors.white, 
    borderRadius:20,
    paddingHorizontal: 10, 
    marginRight: spacing.xs,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    borderColor: colors.green,
    borderWidth: 2,
    textAlignVertical: 'center',
    paddingVertical: 2,
    alignItems: 'center'
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
  },
circle: {
  width: 22,
  height: 22,
  borderRadius: 50
},
stroke: {
  backgroundColor: "#ffffff",
  borderRadius: 50,
  width: "100%",
  height: "100%",
  zIndex: 1
},
core: {
  backgroundColor: colors.blue,
  width: 20,
  height: 20,
  position: "absolute",
  top: 1,
  left: 1,
  right: 1,
  bottom: 1,
  borderRadius: 50,
  zIndex: 2,
  justifyContent: 'center'
}


})