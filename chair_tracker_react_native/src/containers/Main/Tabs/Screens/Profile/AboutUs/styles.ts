import styled from 'styled-components/native';
import type { ContainerProps } from './types';

export const Container = styled.ScrollView<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;
export const Content = styled.Text`
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 15px;
  margin: 8px 16px;
  line-height: 25px;
`;
