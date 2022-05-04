import type { FC } from 'react';
import { useCallback } from 'react';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalOverlay } from '../Components';
import AlarmDayCard from './AlarmDayCard';
import useConnect from './connect';
import {
  Container,
  Modal,
  Title,
  ButtonView,
  Cancel,
  Subtitle,
} from './styles';
import type { Props } from './types';

const AlarmsDayModal: FC<Props> = () => {
  const { handleGoBack, normalizedData } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();
  const handleRender = useCallback(
    (item) => (
      <AlarmDayCard
        dias={item.dias}
        oid_alarma={item.oid_alarma}
        t_fin={item.t_fin}
        t_inicio={item.t_inicio}
        key={item.oid_alarma.toString()}
      />
    ),
    [],
  );

  return (
    <Container>
      <ModalOverlay />
      <Modal safeTop={safeTop}>
        <Title>Alarms for the selected day</Title>
        {normalizedData.length === 0 && (
          <Subtitle>There are no alarms for the selected day</Subtitle>
        )}
        {normalizedData.map(handleRender)}
        <ButtonView>
          <Cancel text="Close" handlePress={handleGoBack} />
        </ButtonView>
      </Modal>
    </Container>
  );
};

export default AlarmsDayModal;
