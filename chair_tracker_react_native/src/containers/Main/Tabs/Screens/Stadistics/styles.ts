import type { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { RegistroAlarma } from 'axios/types/registro';
import type { ContainerProps } from './types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  align-items: center;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const RefreshButton = styled.TouchableOpacity`
  position: absolute;
  top: 70px;
  right: 20px;
`;

export const StadisticList = styled.FlatList.attrs<RegistroAlarma>({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    alignItems: 'center',
  },
})`` as unknown as typeof FlatList;
