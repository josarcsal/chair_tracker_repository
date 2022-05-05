import styled from 'styled-components/native';
import {
  Picker as PickerBase,
  PickerIOS as PickerIOSBase,
} from '@react-native-picker/picker';
import { Text as TextBase } from 'components';
import themeBase from 'theme';
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

export const PickerAndroid = styled(PickerBase).attrs({
  mode: 'dropdown',
  dropdownIconColor: themeBase.colors.cultured,
  dropdownIconRippleColor: themeBase.colors.cultured,
})`
  align-items: center;
  width: 93%;
  margin: 5px 16px;
  background-color: ${({ theme }) => theme.colors.cultured30};
  color: ${({ theme }) => theme.colors.cultured};
  border: 1px solid ${({ theme }) => theme.colors.cultured};
  border-radius: 8px;
` as unknown as typeof PickerBase;

export const PickerIOS = styled(PickerIOSBase).attrs({
  itemStyle: {
    color: 'white',
  },
})`
  margin: -40px 16px;
` as unknown as typeof PickerBase;

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
  margin: 6px 0;
`;

export const TextError = styled.Text`
  font-size: 14px;
  margin: 0px 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.red};
`;
