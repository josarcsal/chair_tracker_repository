import type { FC } from 'react';
import { Platform, UIManager } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StatusBar from 'components/StatusBar';
import Navigator from 'navigator';
import theme from 'theme';
import type { Props } from './types';
import 'i18n';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Root: FC<Props> = () => (
  <ThemeProvider theme={theme}>
    <StatusBar light={true} />
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </SafeAreaProvider>
  </ThemeProvider>
);

export default Root;
