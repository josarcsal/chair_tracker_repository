import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 10px 16px;
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  letter-spacing: 0.41px;
  color: ${({ theme }) => theme.colors.cultured};
`;

export const Subtitle = styled.Text`
  font-size: 24px;
  font-weight: 400;
  line-height: 41px;
  letter-spacing: 0.41px;
  color: ${({ theme }) => theme.colors.cultured};
`;
