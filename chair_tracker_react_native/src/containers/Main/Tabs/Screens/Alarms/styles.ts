import type { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { Alarma } from 'axios/types/alarma';
import type { ContainerProps } from './types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  align-items: center;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  top: 70px;
  right: 20px;
`;

export const RefreshButton = styled.TouchableOpacity`
  position: absolute;
  top: 67px;
  right: 70px;
`;

export const AlarmList = styled.FlatList.attrs<Alarma>({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    alignItems: 'center',
  },
})`` as unknown as typeof FlatList;
