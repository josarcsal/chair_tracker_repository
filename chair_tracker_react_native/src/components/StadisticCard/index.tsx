import React from 'react';
import { chartConfig } from './constants';
import { BarChart, Container, Graph, Title } from './styles';

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
        <BarChart data={data} chartConfig={chartConfig} />
      </Graph>
    </Container>
  );
};

export default StadisticCard;
