import styled from 'styled-components/native';
import { BarChart as BarChartBase } from 'react-native-chart-kit';

export const Container = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.beforeBlue};
  box-sizing: border-box;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.deepOcean};
  width: ${({ theme }) => theme.device.width * 0.91}px;
  shadow-color: '#000';
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const BarChart = styled(BarChartBase).attrs({
  width: 256,
  height: 236,
  yAxisLabel: '',
  yAxisSuffix: '',
  fromZero: true,
  withInnerLines: false,
})`
  align-items: center;
  margin-top: 15px;
`;

export const Graph = styled.View`
  height: 256px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${({ theme }) => theme.colors.beforeBlue};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.cultured};
  margin: 10px 10px;
  font-size: 20px;
  font-weight: 400;
`;
