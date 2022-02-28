import { useContext } from 'react';
import { Dimensions, Platform } from 'react-native';
import { ThemeContext } from 'styled-components/native';

const colors = {
  white: 'white',
  black: 'black',
  carolinaBlue: '#00A1EB',
  graniteGray: '#666666',
  grayX11: '#bababa',
  fdWhite: '#FDFDFD',
  cultured: '#F5F5F5',
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
