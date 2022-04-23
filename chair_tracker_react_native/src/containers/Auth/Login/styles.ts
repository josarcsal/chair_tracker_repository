import styled from 'styled-components/native';
import { Text as TextBase } from 'components';
import type { ContainerProps } from './types';

export const Container = styled.View<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean}; ;
`;

export const Content = styled.View`
  margin: 10px 16px;
  align-items: flex-start;
`;

export const Title = styled(TextBase)`
  font-size: 37px;
  color: ${({ theme }) => theme.colors.cultured};
  font-weight: 400;
  margin-top: 5px;
`;

export const Subtitle = styled(TextBase)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.cultured};
  font-weight: 400;
  margin: 5px 0px;
`;

export const InputText = styled.TextInput`
  font-size: 18px;
  width: 94%;
  height: 50px;
  margin: 5px 16px;
  padding-left: 15px;
  background-color: ${({ theme }) => theme.colors.cultured};
  border: 1px ${({ theme }) => theme.colors.grayX11};
  border-radius: 8px;
  align-self: center;
  justify-content: center;
`;

export const Buttons = styled.View`
  margin-top: 15px;
`;
