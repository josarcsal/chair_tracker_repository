import styled from 'styled-components/native';
import { Text as TextBase } from 'components';

export const Container = styled.View`
  width: 100%;
  padding-top: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 6px;
`;

export const BackText = styled(TextBase)`
  left: 20px;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
`;
