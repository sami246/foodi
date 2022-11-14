import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const AddOverlayButton = () => {
    const navigation = useNavigation();
    const handlePress = () => {
      console.log("Pressed AddOverlayButton")
      navigation.navigate('Add Dish')
    }

    return(    
      <View style={styles.appButtonContainer}>
    <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.shadow}
    >
        <Ionicons style={[styles.addButton, styles.shadow]} color={colors.gold} name="add-circle" size={80}/>
    </TouchableOpacity>
    </View>)

    };

  export default AddOverlayButton

  const styles = StyleSheet.create({
    appButtonContainer: {
      alignItems: 'flex-end', 
      flex: 1,
      position: 'absolute',
      right: 0,
      bottom: STATUS_BAR_HEIGHT + 5,
      },
    shadow: {
        shadowOffset: {
            width: 1,
            height: 2,
            },
        shadowOpacity: 0.6,
        shadowRadius: 1.41,
        elevation: 2,
    },
    addButton: { 
        zIndex: 1,
    },

  })