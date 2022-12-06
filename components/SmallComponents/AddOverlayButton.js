import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const AddOverlayButton = () => {
    const navigation = useNavigation();
    const handlePress = () => {
      navigation.navigate('Add Dish')
    }

    return(    
      <View style={styles.appButtonContainer}>
    <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
    >
        <Ionicons style={[styles.addButton, {}]} color={colors.gold} name="add-circle" size={80}/>
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
      bottom: 10,
      },
    addButton: { 
        zIndex: 1,
    },

  })