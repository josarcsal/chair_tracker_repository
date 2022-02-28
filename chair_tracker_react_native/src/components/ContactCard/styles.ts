import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid grey;
  box-sizing: border-box;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: lightgray;
  height: 140px;
  width: ${({ theme }) => theme.device.width * 0.91}px;
  flex-direction: row;
`;

export const SubContainer = styled.View`
  flex: 2;
  flex-direction: column;
`;

export const Utils = styled.View`
  flex: 1;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: flex-start;
`;

export const MainButton = styled.View`
  border-top-right-radius: 8px;
  height: 100%;
  width: 100%;
  background-color: cyan;
  align-items: center;
  justify-content: center;
`;

export const CallButton = styled.View`
  height: 50%;
  width: 100%;
  border-top-right-radius: 8px;
  background-color: cyan;
  align-items: center;
  justify-content: center;
`;

export const ControlButton = styled.View`
  height: 50%;
  width: 100%;
  border-bottom-right-radius: 8px;
  background-color: grey;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 10px;
  margin-left: 10px;
  color: cyan;
  font-size: 22px;
  font-weight: 600;
`;

export const Subtitle = styled.Text`
  margin: 5px 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const Information = styled.Text`
  position: absolute;
  bottom: 10px;
  margin-left: 10px;
  font-size: 16px;
`;
