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
  margin: 0px 16px;
`;

export const Text = styled.Text`
  font-size: 19px;
  line-height: 41px;
  color: ${({ theme }) => theme.colors.cultured};
`;

export const InputHour = styled.TextInput`
  font-size: 16.5px;
  width: 23%;
  height: 35px;
  padding-left: 15px;
  background-color: ${({ theme }) => theme.colors.cultured};
  border-radius: 8px;
  align-self: center;
  justify-content: center;
`;

export const ButtonView = styled.View`
  margin-top: 20px;
`;
