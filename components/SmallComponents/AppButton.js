import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, sizes, spacing } from '../../constants/theme';



const AppButton = ({ onPress, title, height, width, fontSize, icon, backgroundColor, color, buttonStyle }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.appButtonContainer,{height: height, width: width, backgroundColor: backgroundColor}, buttonStyle]}
    >
      {icon}
      <Text style={[styles.appButtonText, {fontSize: fontSize, color: color}]} >{title}</Text>
    </TouchableOpacity>
  );

  export default AppButton

  const styles = StyleSheet.create({
    appButtonContainer: {
        flex: 1,
        elevation: 3,
        backgroundColor: colors.blue,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 5,
        // maxHeight: 50,
        flexDirection: 'row',
      },
      appButtonText: {
        flex: 1,
        color: colors.white,
        fontWeight: "bold",
        alignSelf: "center",
        textAlign: 'center',
        textAlignVertical: 'center'
      }

  })