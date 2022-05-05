import { useContext } from 'react';
import { Dimensions, Platform } from 'react-native';
import { ThemeContext } from 'styled-components/native';

const colors = {
  white: 'white',
  black: 'black',
  red: '#BE4B55',
  yellow: 'yellow',
  blue: 'blue',
  transparent: 'rgba(0,0,0,0)',
  carolinaBlue: '#00A1EB',
  graniteGray: '#666666',
  grayX11: '#bababa',
  fdWhite: '#FDFDFD',
  cultured: '#F5F5F5',
  deepOcean: '#080B1A',
  accentBlue: '#0D155C',
  whiteC2: '#C2C6D2',
  marineBlue: '#6F7DAC',
  twentyBlue: '#22254E',
  beforeBlue: '#222B4C',
  orangeC7: '#C75D21',
  deepOcean80: '#080B1A80',
  cultured30: '#F5F5F30',
};

const { width, height } = Dimensions.get('window');

export const device = {
  width,
  height,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};

const theme = {
  colors,
  device,
};

export type Theme = typeof theme;

export default theme as Theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const useTheme = () => useContext(ThemeContext);
