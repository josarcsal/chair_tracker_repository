import styled from 'styled-components/native';
import { Picker as PickerBase } from '@react-native-picker/picker';
import { Text as TextBase } from 'components';
import type { ContainerProps } from './types';

export const Container = styled.ScrollView<ContainerProps>`
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
  margin-top: 8px;
`;

export const Picker = styled(PickerBase).attrs({
  mode: 'dropdown',
})`
  align-items: center;
  width: 93%;
  margin: 5px 16px;
  background-color: ${({ theme }) => theme.colors.fdWhite};
  border: 1px solid ${({ theme }) => theme.colors.grayX11};
  border-radius: 8px;
` as unknown as typeof PickerBase;

export const InputText = styled.TextInput`
  font-size: 18px;
  width: 94%;
  height: 50px;
  margin: 5px 16px;
  padding-left: 15px;
  background-color: ${({ theme }) => theme.colors.fdWhite};
  border: 1px solid ${({ theme }) => theme.colors.grayX11};
  border-radius: 8px;
  align-self: center;
  justify-content: center;
`;

export const Buttons = styled.View`
  margin: 6px 0;
`;

export const TextError = styled.Text`
  font-size: 14px;
  margin: 0px 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.red};
`;
