import type { FC } from 'react';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalOverlay } from '../Components';
import useConnect from './connect';
import {
  Container,
  Modal,
  Title,
  Button,
  ButtonView,
  ButtonSpacer,
  Cancel,
  Subtitle,
} from './styles';
import type { Props } from './types';

const ConfirmModal: FC<Props> = () => {
  const { handleGoBack, title, subtitle, handleConfirm } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container>
      <ModalOverlay />
      <Modal safeTop={safeTop}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <ButtonView>
          <Cancel text="Cancel" handlePress={handleGoBack} />
          <ButtonSpacer />
          <Button text="Confirm" handlePress={handleConfirm} />
        </ButtonView>
      </Modal>
    </Container>
  );
};

export default ConfirmModal;
