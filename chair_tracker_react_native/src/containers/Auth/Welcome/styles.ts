import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Text as TextBase } from 'components';
import type { ContainerProps } from './types';

export const Container = styled.View<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const ImageContainer = styled.View`
  flex: 2;
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const Background = styled(FastImage).attrs({
  resizeMode: 'cover',
})`
  border-radius: 12px;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
`;

export const SubContainer = styled.View<ContainerProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.beforeBlue};
  align-items: center;
  justify-content: center;
  padding-bottom: ${({ safeBottom }) => `${safeBottom}px`};
`;

export const Title = styled(TextBase)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.cultured};
  font-weight: 400;
`;

export const Subtitle = styled(TextBase)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.cultured};
  margin: 15px 16px;
  margin-top: 5px;
  text-align: center;
`;
