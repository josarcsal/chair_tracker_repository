import type { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, Login, SignUp, Tabs } from 'containers';
import NewAlarms from 'containers/Main/Tabs/Screens/Alarms/NewAlarms';
import AboutUs from 'containers/Main/Tabs/Screens/Profile/AboutUs';
import CallHistory from 'containers/Main/Tabs/Screens/Profile/CallHistory';
import TermsAndConditions from 'containers/Main/Tabs/Screens/Profile/TermsAndConditions';
import { AlarmsDayModal, CallModal, DeleteModal } from 'containers/Modals';
import useConnect from './connect';
import {
  generalStackScreenOptions,
  modalStackScreenOptions,
  transparentModal,
} from './constants';
import type { Props } from './types';

const { Navigator, Group, Screen } = createNativeStackNavigator();

const AppNavigator: FC<Props> = () => {
  const { logged, readValue } = useConnect();
  readValue();

  return (
    <Navigator screenOptions={generalStackScreenOptions}>
      {logged === '1' ? (
        <Group screenOptions={generalStackScreenOptions}>
          <Screen name="Tabs" component={Tabs} />
          <Screen name="NewAlarms" component={NewAlarms} />
          <Screen name="CallHistory" component={CallHistory} />
        </Group>
      ) : (
        <Group screenOptions={generalStackScreenOptions}>
          <Screen name="Welcome" component={Welcome} />
          <Screen name="SignUp" component={SignUp} />
          <Screen name="Login" component={Login} />
        </Group>
      )}
      <Group screenOptions={modalStackScreenOptions}>
        <Screen name="AboutUs" component={AboutUs} />
        <Screen name="TermsAndConditions" component={TermsAndConditions} />
      </Group>
      <Group screenOptions={transparentModal}>
        <Screen name="DeleteModal" component={DeleteModal} />
        <Screen name="CallModal" component={CallModal} />
        <Screen name="AlarmsDayModal" component={AlarmsDayModal} />
      </Group>
    </Navigator>
  );
};

export default AppNavigator;
