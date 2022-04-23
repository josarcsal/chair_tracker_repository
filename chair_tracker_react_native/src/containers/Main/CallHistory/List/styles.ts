import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { ListProps } from './types';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const Divider = styled.View`
  height: 16px;
`;

export const CardList = styled(FlatList).attrs<ListProps>(({ safeBottom }) => ({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: safeBottom + 16,
  },
}))`` as unknown as typeof FlatList;
