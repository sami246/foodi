import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, sizes } from '../constants/theme';

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  export default AppButton

  const styles = StyleSheet.create({
    appButtonContainer: {
        flex: 1,
        elevation: 8,
        backgroundColor: colors.blue,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 10
      },
      appButtonText: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }

  })