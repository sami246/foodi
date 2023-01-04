import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {sizes, spacing, colors} from '../constants/theme';

const SectionHeader = ({title, onPress, buttonTitle, textStyle}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
      <Button onPress={onPress} title={buttonTitle} color={colors.primary}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: spacing.l,
    marginRight: spacing.m,
    marginTop: spacing.m,
    marginBottom: 10,
  },
  title: {
    fontSize: sizes.h3 + 4,
    fontWeight: 'bold',
  },
});

export default SectionHeader;