import styled from 'styled-components/native';
import type { MainProps } from './types';

export const Main = styled.View<MainProps>`
  flex-direction: row;
  padding-top: 12px;
  padding-bottom: ${({ safeBottom }) => safeBottom + 10}px;
  border-top-width: 0;
  z-index: 555;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
`;
