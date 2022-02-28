import type { FC } from 'react';
import MainHeader from 'components/Header/MainHeader';
import StadisticCard from 'components/StadisticCard';
import { StadisticList, Container } from './styles';
import type { Props } from './types';

const Stadistics: FC<Props> = () => (
  <Container>
    <MainHeader title="Stadistics" subtitle="Your cicles" />
    <StadisticList
      data={['1', '2', '3', '4', '5']}
      renderItem={() => <StadisticCard />}
    />
  </Container>
);

export default Stadistics;
