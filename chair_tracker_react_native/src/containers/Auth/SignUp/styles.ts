import styled from 'styled-components/native';
import { Text as TextBase } from 'components';
import type { ContainerProps } from './types';

export const Container = styled.View<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
`;

export const Content = styled.View`
  margin: 10px 20px;
  align-items: flex-start;
`;

export const Title = styled(TextBase)`
  font-size: 37px;
  color: ${({ theme }) => theme.colors.graniteGray};
  font-weight: 400;
  margin-top: 20px;
`;
