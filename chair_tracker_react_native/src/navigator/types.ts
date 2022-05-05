import type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreensParams {}
  }
}

type DeleteModalParams = {
  id: number;
};

type CallModalParams = {
  destinatarioHashMac: string;
  destinatarioNombre: string;
};

type AlarmsDayModalParams = {
  hashMac: string;
  days: string;
};

type NewAlarmsParams = {
  hashMac: string;
};

export type ScreensParams = {
  Login: undefined;
  SignUp: undefined;
  Alarms: undefined;
  NewAlarms: NewAlarmsParams;
  Stadistics: undefined;
  Profile: undefined;
  CallHistory: undefined;
  AboutUs: undefined;
  TermsAndConditions: undefined;
  Contacts: undefined;
  DeleteModal: DeleteModalParams;
  CallModal: CallModalParams;
  AlarmsDayModal: AlarmsDayModalParams;
};

export type MainStackScreenProps<ScreenName extends keyof ScreensParams> =
  NativeStackScreenProps<ScreensParams, ScreenName>;

export type Props = {};
