import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.grayX11};
  box-sizing: border-box;
  margin: 7.5px;
  padding-bottom: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cultured};
  width: ${({ theme }) => theme.device.width * 0.45}px;
  shadow-color: '#000';
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Title = styled.Text`
  margin: 10px 10px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

export const Information = styled.Text`
  margin: 2px 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.graniteGray};
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;
