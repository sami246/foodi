import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const AddOverlayButton = ({dish, buttonColor}) => {
    const navigation = useNavigation();
    const handlePress = () => {
      if(dish){
        navigation.navigate('Add Dish')
      }
      else{
        // TODO Navigate to Add Restaurant
        navigation.navigate('Settings')
      }
       
    }

    return(    
      <View style={styles.appButtonContainer}>
    <TouchableOpacity
        // activeOpacity={0.7}
        onPress={handlePress}
        
    >
        <MaterialCommunityIcons style={[styles.addButton, {}]} color={buttonColor} name="plus-circle" size={80}/>
        <View style={{backgroundColor: colors.white, width: 40, height: 40,       position: 'absolute',
      right: 20,
      bottom: 20,}} />
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