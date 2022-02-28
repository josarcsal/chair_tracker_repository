import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_ENDPOINT } from '@env';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools';

export const setupApollo = async () => {
  const httpLink = createHttpLink({ uri: GRAPHQL_ENDPOINT });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link: httpLink,
  });

  if (__DEV__) {
    enableFlipperApolloDevtools(client as any);
  }

  return client;
};

export default setupApollo;
