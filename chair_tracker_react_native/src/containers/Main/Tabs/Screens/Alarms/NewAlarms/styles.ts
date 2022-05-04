import styled from 'styled-components/native';
import type { ContainerProps } from '../types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const HourView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 16px;
  height: 35px;
`;

export const Text = styled.Text`
  font-size: 18px;
  line-height: 41px;
  color: ${({ theme }) => theme.colors.cultured};
`;

export const TextError = styled.Text`
  font-size: 14px;
  margin: 0px 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.red};
`;

export const OpenButton = styled.TouchableOpacity`
  width: 23%;
  background-color: ${({ theme }) => theme.colors.cultured};
  border-radius: 8px;
  align-items: center;
`;

export const OpenText = styled.Text`
  font-size: 14px;
  padding-top: 7px;
  color: ${({ theme }) => theme.colors.marineBlue};
`;

export const InputHour = styled.TextInput`
  font-size: 14px;
  width: 23%;
  background-color: ${({ theme }) => theme.colors.cultured};
  border-radius: 8px;
  text-align: center;
`;

export const ButtonView = styled.View`
  margin-top: 20px;
`;
