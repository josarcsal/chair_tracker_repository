import type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreensParams {}
  }
}

export type ScreensParams = {
  Login: undefined;
  Alarms: undefined;
  NewAlarms: undefined;
  Stadistics: undefined;
  Profile: undefined;
  WorkersList: undefined;
  AboutUs: undefined;
  Contacts: undefined;
};

export type MainStackScreenProps<ScreenName extends keyof ScreensParams> =
  NativeStackScreenProps<ScreensParams, ScreenName>;

export type Props = {};
