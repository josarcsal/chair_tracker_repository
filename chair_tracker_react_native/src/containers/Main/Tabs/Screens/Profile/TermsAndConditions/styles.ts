import styled from 'styled-components/native';
import type { ContainerProps } from './types';

export const Container = styled.ScrollView.attrs<ContainerProps>(
  ({ safeTop }) => ({
    alwaysBounceVertical: false,
    contentContainerStyle: {
      paddingTop: safeTop + 16,
    },
  }),
)<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;
export const Content = styled.Text`
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 15px;
  margin: 8px 16px;
  line-height: 25px;
  text-align: justify;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 30px;
  font-weight: bold;
  margin: 16px 16px 8px;
`;
