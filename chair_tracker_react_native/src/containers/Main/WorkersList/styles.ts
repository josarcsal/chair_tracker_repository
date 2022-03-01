import styled from 'styled-components/native';
import type { ContainerProps } from './types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  align-items: center;
`;

export const Workers = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    aligItems: 'center',
  },
})``;
