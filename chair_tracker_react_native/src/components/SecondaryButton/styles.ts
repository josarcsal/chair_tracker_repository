import styled from 'styled-components/native';
import { Text as TextBase } from 'components';

export const SignUpButton = styled.TouchableOpacity`
  width: 95%;
  align-self: center;
`;

export const SignUpText = styled(TextBase)`
  font-size: 16px;
  margin: 5px;
  color: ${({ theme }) => theme.colors.grayX11};
  text-align: center;
`;
