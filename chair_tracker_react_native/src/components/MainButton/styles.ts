import styled from 'styled-components/native';
import { Text as TextBase } from 'components';

export const SignInButton = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  margin: 5px 16px;
  background-color: ${({ theme }) => theme.colors.carolinaBlue};
  border: 1px solid ${({ theme }) => theme.colors.grayX11};
  box-sizing: border-box;
  border-radius: 8px;
  shadow-color: '#000';
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
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
