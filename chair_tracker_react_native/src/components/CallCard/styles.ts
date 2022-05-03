import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.beforeBlue};
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.beforeBlue};
  width: ${({ theme }) => theme.device.width * 0.91}px;
  flex-direction: row;
  shadow-color: '#000';
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const SubContainer = styled.View`
  flex: 2;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const MainButton = styled.TouchableOpacity`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.deepOcean};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 10px 10px 5px;
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 22px;
  font-weight: 600;
`;

export const Subtitle = styled.Text`
  margin-top: 5px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.marineBlue};
`;
