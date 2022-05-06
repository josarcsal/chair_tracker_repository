import type { FC } from 'react';
import { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Alarma } from 'axios/types/alarma';
import AlarmCard from 'components/AlarmCard';
import MainHeader from 'components/Header/MainHeader';
import type { AlarmProps } from 'containers/Main/Tabs/Screens/Alarms/types';
import useConnect from './connect';
import { AlarmList, Container } from './styles';
import type { Props } from './types';

const Alarms: FC<Props> = () => {
  const {
    handleToAddAlarms,
    normalizedData,
    readValue,
    handleDeleteAlarm,
    refetch,
  } = useConnect();
  const handleKeyExtractor = (item: Alarma) => item.oid_alarma.toString();
  const handleRenderItem = useCallback(
    ({ item }: AlarmProps) => (
      <AlarmCard
        oid_alarma={item.oid_alarma}
        dias={item.dias}
        t_descanso={item.t_descanso}
        t_fin={item.t_fin}
        t_inicio={item.t_inicio}
        t_trabajo={item.t_trabajo}
        handleDelete={handleDeleteAlarm}
      />
    ),
    [handleDeleteAlarm],
  );
  const { top: safeTop } = useSafeAreaInsets();
  readValue();
  return (
    <Container safeTop={safeTop}>
      <MainHeader
        title="Alarms"
        subtitle="Your schedule"
        handleAdd={handleToAddAlarms}
        refetch={refetch}
      />
      <AlarmList
        data={normalizedData}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
      />
    </Container>
  );
};

export default Alarms;
