import type { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { Usuario } from 'axios/types/usuario';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fdWhite};
`;

export const ContactList = styled.FlatList.attrs<Usuario>({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    paddingLeft: 8,
    paddingRight: 8,
  },
})`` as unknown as typeof FlatList;
