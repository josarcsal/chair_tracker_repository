import type { FC } from 'react';
import { useCallback } from 'react';
import React, { memo } from 'react';
import CallIcon from 'components/Icons/CallIcon';
import { Container, MainButton, SubContainer, Subtitle, Title } from './styles';
import type { Props } from './types';

const ContactCard: FC<Props> = ({
  nombre,
  hash_mac,
  fecha,
  desde,
  descripcion,
  onPress,
}) => {
  const handlePress = useCallback(() => {
    onPress(hash_mac || '');
  }, [hash_mac, onPress]);
  return (
    <Container>
      <SubContainer>
        <Title>{nombre}</Title>
        <Subtitle>From: {desde}</Subtitle>
        <Subtitle>Message: {descripcion}</Subtitle>
        <Subtitle>{fecha}</Subtitle>
      </SubContainer>
      <MainButton onPress={handlePress}>
        <CallIcon />
      </MainButton>
    </Container>
  );
};

export default memo(ContactCard);
