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
  const { handleGoBack, handleDelete, oidAlarm } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container>
      <ModalOverlay />
      <Modal safeTop={safeTop}>
        <Title>Delete alarm</Title>
        {oidAlarm === '' ? (
          <Subtitle>
            Are you sure you want to delete this alarm? You will not be able to
            restore it but its data will still be use for stadistics
          </Subtitle>
        ) : (
          <Subtitle>
            The alarm - {oidAlarm} has been deleted succesfully
          </Subtitle>
        )}
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
