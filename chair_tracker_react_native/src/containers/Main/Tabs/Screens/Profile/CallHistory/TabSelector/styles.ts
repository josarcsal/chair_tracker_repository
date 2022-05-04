import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import BaseText from 'components/Text';
import type { ButtonProps } from './types';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 42px;
  margin: 16px 16px 24px;
`;

export const Title = styled(BaseText).attrs({})`
  color: ${({ theme }) => theme.colors.cultured};
`;

export const Main = styled.View<ButtonProps>`
  height: 42px;
  flex: 1;
  margin-top: 6px;
  align-items: center;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.colors.graniteGray};
  ${({ disabled }) =>
    !disabled &&
    css`
      border-bottom-width: 2px;
      border-color: ${({ theme }) => theme.colors.white};
    `};
`;

export const ButtonContainer = styled(RectButton).attrs(({ theme }) => ({
  rippleColor: theme.colors.white,
  underlayColor: theme.colors.white,
}))`
  flex: 1;
`;
