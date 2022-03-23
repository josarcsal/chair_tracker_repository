import styled from 'styled-components/native';
import { Text as TextBase } from 'components';
import type { ContainerProps } from './types';

export const Container = styled.View<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.fdWhite}; ;
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

export const Subtitle = styled(TextBase)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.grayX11};
  font-weight: 400;
  margin-top: 5px;
`;

export const InputText = styled.TextInput`
  font-size: 18px;
  width: 90%;
  height: 50px;
  margin: 10px 20px;
  padding-left: 15px;
  background-color: ${({ theme }) => theme.colors.fdWhite};
  border: 1px solid ${({ theme }) => theme.colors.grayX11};
  border-radius: 8px;
  align-self: center;
  justify-content: center;
`;
