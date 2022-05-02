import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const generalStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const modalStackScreenOptions: NativeStackNavigationOptions = {
  ...generalStackScreenOptions,
  presentation: 'modal',
};

export const transparentModal: NativeStackNavigationOptions = {
  ...generalStackScreenOptions,
  presentation: 'transparentModal',
  animation: 'fade',
};
