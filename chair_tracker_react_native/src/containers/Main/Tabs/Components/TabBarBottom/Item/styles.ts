import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Text from 'components/Text';
import type { LabelProps } from './types';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled(BorderlessButton).attrs(() => ({
  activeOpacity: 1,
}))`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const focusedLabelStyles = css`
  color: ${({ theme }) => theme.colors.cultured};
`;

export const Label = styled(Text).attrs(() => ({
  family: undefined,
}))<LabelProps>`
  color: ${({ theme }) => theme.colors.marineBlue};
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  ${({ focused }) => focused && focusedLabelStyles}
`;
