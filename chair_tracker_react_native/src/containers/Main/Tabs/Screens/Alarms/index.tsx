import type { FC } from 'react';
import { PlusIcon } from 'components';
import AlarmCard from 'components/AlarmCard';
import MainHeader from 'components/Header/MainHeader';
import useConnect from './connect';
import { AddButton, AlarmList, Container } from './styles';
import type { Props } from './types';

const Alarms: FC<Props> = () => {
  const { handleToAddAlarms } = useConnect();

  return (
    <Container>
      <MainHeader title="Alarms" subtitle="Your schedule" />
      <AddButton onPress={handleToAddAlarms}>
        <PlusIcon />
      </AddButton>
      <AlarmList
        data={['1', '2', '3', '4', '5']}
        renderItem={() => <AlarmCard />}
      />
    </Container>
  );
};

export default Alarms;
