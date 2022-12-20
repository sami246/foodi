import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, sizes } from '../constants/theme';



const MultiSelectComponent = ({data, selected, setSelected}) => {


  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.selectedTextStyle}>{item.label}</Text>
        {item.icon}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        maxHeight={430}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            color="black"
            name="food"
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => {unSelect && unSelect(item)}}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color={colors.white} name="delete" size={15} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16, width: '100%', },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
    
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
    
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors.darkBlue,
    shadowColor: '#000',
    marginTop: 12,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 2,
    borderColor: colors.white,
    elevation: 3,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 14,
    color: colors.white

  },
});