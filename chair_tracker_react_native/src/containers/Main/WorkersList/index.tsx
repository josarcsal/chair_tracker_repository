import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ContactCard from 'components/ContactCard';
import DetailHeader from 'components/Header/DetailHeader';
import MainHeader from 'components/Header/MainHeader';
import useConnect from './connect';
import { Container, Workers } from './styles';
import type { Props } from './types';

const WorkersList: FC<Props> = () => {
  const { handleGoBack } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <MainHeader title="Company" subtitle="List of workers" />
      <Workers
        data={['1', '2', '3', '4', '5']}
        renderItem={() => <ContactCard isBoss={true} />}
      />
    </Container>
  );
};

export default WorkersList;