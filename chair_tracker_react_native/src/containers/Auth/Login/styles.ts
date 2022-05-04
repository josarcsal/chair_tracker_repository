import styled from 'styled-components/native';
import { Text as TextBase } from 'components';
import themeBase from 'theme';
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

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: themeBase.colors.cultured,
  selectionColor: themeBase.colors.cultured,
})`
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 18px;
  width: 94%;
  height: 50px;
  margin: 5px 16px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.cultured};
  align-self: center;
  justify-content: center;
`;

export const Buttons = styled.View`
  margin-top: 15px;
`;

export const TextError = styled.Text`
  font-size: 14px;
  margin: 0px 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.red};
`;
