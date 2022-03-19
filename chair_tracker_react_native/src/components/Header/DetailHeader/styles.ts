import styled from 'styled-components/native';
import { Text as TextBase } from 'components';

export const Container = styled.View`
  width: 100%;
  padding-top: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 10px;
`;

export const BackText = styled(TextBase)`
  font-size: 17px;
  line-height: 22px;
  padding-top: 1px;
  letter-spacing: -0.41px;
`;
