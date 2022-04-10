import styled from 'styled-components/native';
import type { ContainerProps } from './types';

export const Container = styled.ScrollView<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
`;
export const Content = styled.Text`
  font-size: 15px;
  margin: 8px 16px;
  line-height: 25px;
`;
