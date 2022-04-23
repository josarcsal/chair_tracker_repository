import styled from 'styled-components/native';
import PagerView from 'react-native-pager-view';
import type { ContainerProps } from './types';

export const Container = styled.View<ContainerProps>`
  flex: 1;
  padding-top: ${({ safeTop }) => `${safeTop}px`};
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const Page = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const Pager = styled(PagerView)`
  flex: 1;
`;
