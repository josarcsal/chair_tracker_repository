import styled from 'styled-components/native';
import { Text } from 'components';
import MainButton from 'components/MainButton';
import type { ModalProps } from './types';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Modal = styled.View<ModalProps>`
  margin-top: ${({ safeTop }) => safeTop + 106}px;
  padding: 32px 24px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.twentyBlue};
  width: ${({ theme }) => theme.device.width - 32}px;
`;

export const Title = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 20px;
  font-weight: 600;
`;

export const Subtitle = styled(Text)`
  margin-top: 12px;
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.cultured};
`;

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 24px 25px 0;
`;

export const Button = styled(MainButton)`
  width: 160px;
  height: 50px;
  border-radius: 8px;
  border-width: 2px;
`;

export const Cancel = styled(MainButton)`
  width: 160px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.deepOcean80};
  border-radius: 8px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.deepOcean80};
`;

export const ButtonSpacer = styled.View`
  width: 12px;
`;
