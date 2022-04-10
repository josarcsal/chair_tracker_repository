import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.grayX11};
  box-sizing: border-box;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.fdWhite};
  width: ${({ theme }) => theme.device.width * 0.91}px;
  shadow-color: '#000';
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Graph = styled.View`
  height: 256px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cultured};
`;

export const Title = styled.Text`
  margin: 10px 10px;
  font-size: 20px;
  font-weight: 400;
`;
