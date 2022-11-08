import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const AddButton = () => {
    const navigation = useNavigation();

    return(    
    <TouchableOpacity
        activeOpacity={0.7}
        onPress={navigation.navigate('Add Dish')}
        style={styles.appButtonContainer}
    >
        <Ionicons style={styles.addButton} color={colors.gold} name="add-circle" size={70}/>
    </TouchableOpacity>)

    };

  export default AddButton

  const styles = StyleSheet.create({
    appButtonContainer: {

      },
      appButtonText: {

      },
      addButton: {
        position: 'absolute',
        bottom: STATUS_BAR_HEIGHT + 10,
        right:10,
        zIndex: 1
    },

  })