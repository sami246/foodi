import {Dimensions, StatusBar} from 'react-native';
// import Constants from 'expo-constants';

const {width, height} = Dimensions.get('window');

export const colors = {
  primary: '#070f18',
  gray: '#787878',
  darkGray: '#4E4E4E',
  lightGray: '#b2b2b2',
  light: '#ECE0C1',
  white: '#fff',
  black: '#000',
  blue: '#11A8E4',
  darkBlue: '#0e75c9',
  yellow: '#edca1c',
  gold: '#F5C229',
  red: '#CA2C1E',
  brown: '#AE7218',
  lightOrange: '#E9974A',
  orange: '#EE8A2C',
  green: '#03C03C',
  darkGreen: '#05ab24'
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
};

export const sizes = {
  width,
  height,
  title: 36,
  h1: 28,
  h2: 24,
  h3: 18,
  body: 14,
  radius: 16,
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight + 5

export const NAV_BAR_HEIGHT = 45;