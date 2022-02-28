import type { FC } from 'react';
import { memo } from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBarBottom } from './Components';
import { tabStackScreenOptions } from './constants';
import { Stadistics, Profile, Contacts, Alarms } from './Screens';

const { Navigator, Screen } = createBottomTabNavigator();

const tabBar = (props: BottomTabBarProps) => <TabBarBottom {...props} />;

const Tabs: FC = () => (
  <Navigator
    tabBar={tabBar}
    initialRouteName="Alarms"
    screenOptions={tabStackScreenOptions}
  >
    <Screen name="Alarms" component={Alarms} />
    <Screen name="Contacts" component={Contacts} />
    <Screen name="Stadistics" component={Stadistics} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);

export default memo(Tabs);
