import type { FC } from 'react';
import React, { memo } from 'react';
import { Container, Overlay } from './styles';
import type { Props } from './types';

const ModalOverlay: FC<Props> = ({ onPress }) => (
  <Container onPress={onPress}>
    <Overlay />
  </Container>
);

export default memo(ModalOverlay);
