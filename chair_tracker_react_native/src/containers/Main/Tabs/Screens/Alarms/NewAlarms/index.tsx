import type { FC } from 'react';
import DetailHeader from 'components/Header/DetailHeader';
import MainHeader from 'components/Header/MainHeader';
import useConnect from './connect';
import { Container } from './styles';
import type { Props } from './types';

const NewAlarms: FC<Props> = () => {
  const { handleGoBack } = useConnect();
  return (
    <Container>
      <DetailHeader onPressBack={handleGoBack} />
      <MainHeader title="New alarm" subtitle="Set your new alarm" />
    </Container>
  );
};

export default NewAlarms;
