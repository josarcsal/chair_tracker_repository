import styled from 'styled-components/native';
import { Text as TextBase } from 'components';

export const Container = styled.View`
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 5px;
`;

export const BackText = styled(TextBase)`
  font-size: 17px;
  line-height: 22px;
  padding-top: 1px;
  letter-spacing: -0.41px;
`;
