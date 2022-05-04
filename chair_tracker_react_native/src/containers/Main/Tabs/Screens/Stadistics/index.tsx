import type { FC } from 'react';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainHeader from 'components/Header/MainHeader';
import RefreshIcon from 'components/Icons/RefreshIcon';
import StadisticCard from 'components/StadisticCard';
import useConnect from './connect';
import { StadisticList, Container, RefreshButton } from './styles';
import type { Props, StadisticsProps } from './types';

const Stadistics: FC<Props> = () => {
  const { normalizedData, refetch, readValue } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();
  readValue();
  const handleRenderItem = useCallback(
    ({ item }: StadisticsProps) => (
      <StadisticCard
        date={item.fecha}
        oid_alarma={item.oid_alarma_fk}
        worked={item.trabajo}
        rested={item.descanso}
      />
    ),
    [],
  );

  return (
    <Container safeTop={safeTop}>
      <MainHeader title="Stadistics" subtitle="Your cicles" />
      <RefreshButton onPress={() => refetch()}>
        <RefreshIcon size={27} />
      </RefreshButton>
      <StadisticList data={normalizedData} renderItem={handleRenderItem} />
    </Container>
  );
};

export default Stadistics;
