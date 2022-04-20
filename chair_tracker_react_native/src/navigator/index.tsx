import type { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, Login, SignUp, Tabs } from 'containers';
import CallHistory from 'containers/Main/CallHistory';
import NewAlarms from 'containers/Main/Tabs/Screens/Alarms/NewAlarms';
import AboutUs from 'containers/Main/Tabs/Screens/Profile/AboutUs';
import {
  generalStackScreenOptions,
  modalStackScreenOptions,
} from './constants';
import type { Props } from './types';

const { Navigator, Group, Screen } = createNativeStackNavigator();

const AppNavigator: FC<Props> = () => {
  const ready = true;
  return (
    <Navigator screenOptions={generalStackScreenOptions}>
      {ready ? (
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
      </Group>
    </Navigator>
  );
};

export default AppNavigator;
