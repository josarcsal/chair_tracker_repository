import type { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { Usuario } from 'axios/types/usuario';
import type { ContainerProps } from './types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  align-items: center;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.fdWhite};
`;

export const ContactList = styled.FlatList.attrs<Usuario>({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    alignItems: 'center',
  },
})`` as unknown as typeof FlatList;
