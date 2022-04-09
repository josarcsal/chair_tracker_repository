import styled from 'styled-components/native';
import type { ContainerProps } from '../types';

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.fdWhite}; ;
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

export const HourView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 22px;
`;

export const Text = styled.Text`
  font-size: 19px;
  line-height: 41px;
`;

export const InputHour = styled.TextInput`
  font-size: 16.5px;
  width: 25%;
  height: 35px;
  padding-left: 15px;
  background-color: ${({ theme }) => theme.colors.cultured};
  border-radius: 8px;
  align-self: center;
  justify-content: center;
`;
