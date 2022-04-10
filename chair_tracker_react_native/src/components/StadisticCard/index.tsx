import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import theme from 'theme';
import { Container, Graph, Title } from './styles';
const chartConfig = {
  backgroundColor: theme.colors.beforeBlue,
  backgroundGradientFrom: theme.colors.beforeBlue,
  backgroundGradientTo: theme.colors.beforeBlue,
  color: () => theme.colors.cultured,
};

const StadisticCard = () => {
  const data = {
    labels: ['Worked', 'Rested'],
    datasets: [
      {
        data: [40, 20],
      },
    ],
  };

  return (
    <Container>
      <Title>Bar Graph</Title>
      <Graph>
        <BarChart
          yAxisLabel={''}
          yAxisSuffix={''}
          width={256}
          height={256}
          data={data}
          chartConfig={chartConfig}
          fromZero={true}
          withInnerLines={false}
          style={{
            alignItems: 'center',
            paddingHorizontal: 30,
            marginBottom: 5,
          }}
        />
      </Graph>
    </Container>
  );
};

export default StadisticCard;
