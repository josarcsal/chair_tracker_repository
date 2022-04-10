import styled from 'styled-components/native';
import type { ContainerProps } from './types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  align-items: center;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const AddButton = styled.TouchableOpacity`
  margin-right: 6px;
  position: absolute;
  top: 65px;
  right: 22px;
`;

export const StadisticList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    alignItems: 'center',
  },
})``;
