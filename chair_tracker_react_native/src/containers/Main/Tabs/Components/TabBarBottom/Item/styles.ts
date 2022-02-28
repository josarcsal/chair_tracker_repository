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
  color: ${({ theme }) => theme.colors.carolinaBlue};
`;

export const Label = styled(Text).attrs(() => ({
  family: undefined,
}))<LabelProps>`
  font-size: 12px;
  line-height: 17px;
  margin-top: 8px;
  text-align: center;
  ${({ focused }) => focused && focusedLabelStyles}
`;
