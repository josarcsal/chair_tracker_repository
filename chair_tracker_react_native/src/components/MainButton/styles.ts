import styled from 'styled-components/native';
import { Text as TextBase } from 'components';

export const SignInButton = styled.TouchableOpacity`
  height: 60px;
  width: 95%;
  background-color: ${({ theme }) => theme.colors.marineBlue};
  border: 1px solid ${({ theme }) => theme.colors.marineBlue};
  border-radius: 8px;
  align-self: center;
  justify-content: center;
`;

export const SignInText = styled(TextBase)`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fdWhite};
  text-align: center;
  top: -1.5px;
`;
