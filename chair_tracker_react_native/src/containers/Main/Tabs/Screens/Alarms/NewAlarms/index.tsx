import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainHeader from 'components/Header/MainHeader';
import useConnect from './connect';
import { Container } from './styles';
import type { Props } from './types';

const NewAlarms: FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const { handleGoBack } = useConnect();
  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <MainHeader title="New alarm" subtitle="Set your new alarm" />
    </Container>
  );
};

export default NewAlarms;
