import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 0px 7.5px 0px;
  padding-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.transparent};
`;

export const InformationView = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  margin: 6px 10px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.cultured};
`;

export const Information = styled.Text`
  margin: 2px 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.marineBlue};
`;

export const Divider = styled.View`
  margin-top: 12px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.marineBlue};
`;
