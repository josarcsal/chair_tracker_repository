import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.grayX11};
  box-sizing: border-box;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cultured};
  width: ${({ theme }) => theme.device.width * 0.91}px;
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
