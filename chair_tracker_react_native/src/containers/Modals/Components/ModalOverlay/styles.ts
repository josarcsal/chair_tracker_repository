import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const Overlay = styled.View`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.deepOcean80};
`;
