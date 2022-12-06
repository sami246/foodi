import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { colors, sizes, spacing} from '../../constants/theme'
import { Gooogle_API_Key } from '../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AppButton from '../SmallComponents/AppButton';

const AddRestaurant = ({modalVisible, setModalVisible, setRestaurant, setRestaurantAdditional}) => {
    const ref = useRef();

    useEffect(() => {
    }, []);
  
    const handlePlaces = (data, details) => {
      setModalVisible(false);
    //   console.log(JSON.stringify(details, null, 3));
        var restaurant = details.name
        var resAdditional = {
            address: details.formatted_address,
            url: details.url,
            place_id: details.place_id,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
            price_level: details.price_level,
            website: details.website,
            rating: details.rating
        }
      setRestaurant(restaurant)
      setRestaurantAdditional(resAdditional)
    }

    const handleNotFoundSave = () => {
        console.log("handleNotFoundSave")
        setRestaurant(ref.current?.getAddressText());
        setRestaurantAdditional(null)
        setModalVisible(false);
      }

  return (
    <View>
        <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}

        >
        <View style={{backgroundColor: 'rgba(0,0,0,0.2)', height: sizes.height, width: sizes.width}}>
            <View style={styles.centeredView}>
                <Text style={styles.title}>Add a Restaurant</Text>
                <View style={styles.modalView}>
                    <GooglePlacesAutocomplete
                    placeholder="Search for a restaurant"
                    ref={ref}
                    onPress={(data, details = null) => handlePlaces(data, details)}
                    query={{
                        key: Gooogle_API_Key,
                        type: 'food',
                        type: 'restaurant',
                        language: 'en',
                    }}
                    fetchDetails={true}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    listEmptyComponent={() => (
                        <Pressable onPress={() => handleNotFoundSave()} style={{flex: 1, borderColor: colors.darkGray, borderBottomWidth: 1.5, padding: 10, fontSize: 14, backgroundColor: 'white', elevation: 2}}>
                            <Text style={{fontWeight: '500'}}>{ref.current?.getAddressText()}</Text>
                            <Text style={{fontWeight: '300'}}>(Not on Google Maps)</Text>
                        </Pressable>
                        
                    )}
                    enablePoweredByContainer={false}
                    styles={{
                        container: {padding: 10, fontSize: 14, backgroundColor: 'white', elevation: 2, width: '100%', borderRadius: 10},
                        separator: { paddingVertical: 3},
                        // description: {borderColor: colors.orange, borderBottomWidth: 1.5, padding: 10, fontSize: 14, backgroundColor: 'white', borderRadius: 10},
                        loader: {
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            height: 20,
                        },
                        row: {
                            backgroundColor: '#FFFFFF',
                            padding: 13,
                            height: 44,
                            flexDirection: 'row',
                        },
                    }}
                    listUnderlayColor= {colors.orange}
                    suppressDefaultStyles= {true}
                    autoFillOnNotFound={true}
                    />
                    
                </View>
                <View style={{marginHorizontal: 20, marginBottom: 5, alignItems: 'center', top: -5}}>
                <Text style={styles.text}>Try adding the rough location to find the restaurant. </Text>
                <Text style={styles.text}>Or save without Google verified location, we accept both! </Text>
                </View>
                <View style= {{height: 55, width: 150, alignSelf: 'center', marginBottom: spacing.s}}>
                    <AppButton
                        fontSize={15}
                        height={50}
                        width={"100%"}
                        onPress={() => handleNotFoundSave()}
                        title="Save"
                        backgroundColor={colors.orange}
                        color={colors.white}
                        buttonStyle={{
                            borderColor: colors.white,
                            borderWidth: 2,
                        }}
                        />
                </View>
                <View style= {{height: 55, width: 150, alignSelf: 'center', marginBottom: spacing.m}}>
                    
                    <AppButton
                        fontSize={15}
                        height={spacing.xl}
                        width={"100%"}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        title="Cancel"
                        backgroundColor={colors.orange}
                        color={colors.white}
                        buttonStyle={{
                            borderColor: colors.white,
                            borderWidth: 2,
                        }}
                        />
                </View>
            </View>
        </View>
        </Modal>
    </View>
  )
}

export default AddRestaurant

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20,
        width: sizes.width - spacing.l,
        backgroundColor: colors.lightOrange
      },
      modalView: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 27,
        fontWeight: '500',
        marginLeft: spacing.l,
        color: colors.white,
        marginTop: spacing.m,
    },
    text: {
        fontSize: 12,
        color: colors.darkGray
    }
})