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

const DeleteModal: FC<Props> = () => {
  const { handleGoBack, title, subtitle, handleDelete, oidAlarm } =
    useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container>
      <ModalOverlay />
      <Modal safeTop={safeTop}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <ButtonView>
          <Cancel text="Close" handlePress={handleGoBack} />
          {oidAlarm === '' && (
            <>
              <ButtonSpacer />
              <Button text="Delete" handlePress={handleDelete} />
            </>
          )}
        </ButtonView>
      </Modal>
    </Container>
  );
};

export default DeleteModal;
