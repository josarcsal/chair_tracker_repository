import type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreensParams {}
  }
}
type ConfirmModalParams = {
  title: string;
  subtitle: string;
  handleConfirm: () => void;
};

type DeleteModalParams = {
  title: string;
  subtitle: string;
  id: number;
};

export type ScreensParams = {
  Login: undefined;
  SignUp: undefined;
  Alarms: undefined;
  NewAlarms: undefined;
  Stadistics: undefined;
  Profile: undefined;
  CallHistory: undefined;
  AboutUs: undefined;
  TermsAndConditions: undefined;
  Contacts: undefined;
  ConfirmModal: ConfirmModalParams;
  DeleteModal: DeleteModalParams;
};

export type MainStackScreenProps<ScreenName extends keyof ScreensParams> =
  NativeStackScreenProps<ScreensParams, ScreenName>;

export type Props = {};
