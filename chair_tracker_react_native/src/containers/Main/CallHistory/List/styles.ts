import type { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { RegistroLlamada } from 'axios/types/registro';
import type { ListProps } from './types';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const Divider = styled.View`
  height: 16px;
`;

export const CardList = styled.FlatList.attrs<ListProps>(({ safeBottom }) => ({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: safeBottom + 16,
  },
}))<RegistroLlamada>`` as unknown as typeof FlatList;
