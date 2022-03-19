import styled from 'styled-components/native';
import type { ContainerProps } from '../types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.fdWhite}; ;
`;
