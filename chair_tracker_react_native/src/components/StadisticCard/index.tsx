import React from 'react';
import { chartConfig } from './constants';
import { BarChart, Container, Graph, Title } from './styles';
import type { Props } from './types';

const StadisticCard = ({ date, oid_alarma, worked, rested }: Props) => {
  const data = {
    labels: ['Worked', 'Rested'],
    datasets: [
      {
        data: [worked / 60, rested / 60],
      },
    ],
  };

  const month = date.toString().split('-')[1];
  const year = date.toString().split('-')[0];
  const title = month + '/' + year + ' - Alarm ' + oid_alarma;

  return (
    <Container>
      <Title>{title}</Title>
      <Graph>
        <BarChart data={data} chartConfig={chartConfig} />
      </Graph>
    </Container>
  );
};

export default StadisticCard;
