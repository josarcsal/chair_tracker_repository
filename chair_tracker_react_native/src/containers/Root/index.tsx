import type { FC } from 'react';
import { Platform, UIManager } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StatusBar from 'components/StatusBar';
import Navigator from 'navigator';
import theme from 'theme';
import useConnect from './connect';
import type { Props } from './types';
import 'i18n';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Root: FC<Props> = () => {
  const { apolloClient, ready } = useConnect();

  if (!ready || !apolloClient) {
    // TODO: Add loading screen
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <StatusBar />
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Root;
