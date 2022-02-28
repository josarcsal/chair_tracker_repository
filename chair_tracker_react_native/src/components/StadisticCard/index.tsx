import type { FC } from 'react';
import React, { memo } from 'react';
import { Container, Graph, Title } from './styles';
import type { Props } from './types';

const StadisticCard: FC<Props> = () => (
  <Container>
    <Graph />
    <Title>Date</Title>
  </Container>
);

export default memo(StadisticCard);
