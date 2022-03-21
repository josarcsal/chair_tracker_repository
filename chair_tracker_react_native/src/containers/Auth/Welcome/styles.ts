import styled from 'styled-components/native';
import { Text as TextBase } from 'components';
import type { ContainerProps } from './types';

export const Container = styled.View<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
`;

export const ImageContainer = styled.View`
  flex: 2;
  background-color: ${({ theme }) => theme.colors.fdWhite};
`;

export const SubContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.cultured};
  align-items: center;
`;

export const Title = styled(TextBase)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.graniteGray};
  font-weight: 400;
  margin-top: 20px;
`;

export const Subtitle = styled(TextBase)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.graniteGray};
  margin: 10px 50px;
  text-align: center;
`;
