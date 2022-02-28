import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid grey;
  box-sizing: border-box;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-radius: 8px;
  background-color: lightgray;
  width: ${({ theme }) => theme.device.width * 0.91}px;
`;

export const Title = styled.Text`
  margin: 10px 10px;
  font-size: 20px;
  font-weight: 600;
`;

export const Information = styled.Text`
  margin: 2px 10px;
  font-size: 16px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;
