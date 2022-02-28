import styled from 'styled-components/native';
import { Text as TextBase } from 'components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled(TextBase)`
  font-size: 20px;
  color: #000;
`;
