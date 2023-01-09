import { StyleSheet, Pressable, View, TouchableOpacity, Alert, } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/theme';

const DeleteButton = ({iconColor, item}) => {
  const navigation = useNavigation();

  const handleDeleteDish = () => {
    Alert.alert(  
      'Delete',  
      'Are you sure you want to delete?',  
      [  
          {  
              text: 'No',  
              onPress: () => console.log('Cancel Delete'),  
              style: 'cancel',  
          },  
          {text: 'Yes', onPress: async () => {
            await deleteDoc(doc(firestoreDB, "dishs", item.id));
            navigation.goBack()
          }},  
      ]  
  );  
  }

  return (
    <View style={{position: 'absolute', top: 0, right: 0, paddingLeft: 8, paddingTop: 5, elevation: 5, shadowColor: 'black'}}>
    <TouchableOpacity onPress={handleDeleteDish}>
        <MaterialCommunityIcons name='delete-circle' size={50} color={iconColor} style={{ zIndex: 1}}/>
        <View style={{backgroundColor: colors.white, width: 27, height: 28, position: 'absolute',
        top: 12,
        right: 11,}} />
    </TouchableOpacity>
    </View>
  )
}

export default DeleteButton

const styles = StyleSheet.create({})