import type { FC } from 'react';
import { useCallback } from 'react';
import React, { memo } from 'react';
import AlarmClockIcon from 'components/Icons/AlarmClockIcon';
import CallIcon from 'components/Icons/CallIcon';
import {
  CallButton,
  Container,
  ControlButton,
  Information,
  MainButton,
  SubContainer,
  Subtitle,
  Title,
  Utils,
} from './styles';
import type { Props } from './types';

const ContactCard: FC<Props> = ({
  isBoss,
  nombre,
  apellidos,
  last_login,
  hash_mac,
  onPress,
}) => {
  const handlePress = useCallback(() => {
    onPress(hash_mac);
  }, [hash_mac, onPress]);
  return (
    <Container>
      <SubContainer>
        <Title>{nombre}</Title>
        <Subtitle>{apellidos}</Subtitle>
        <Information>{last_login}</Information>
      </SubContainer>
      <Utils>
        {isBoss ? (
          <>
            <CallButton onPress={handlePress}>
              <CallIcon size={55} />
            </CallButton>
            <ControlButton>
              <AlarmClockIcon size={50} />
            </ControlButton>
          </>
        ) : (
          <MainButton onPress={handlePress}>
            <CallIcon />
          </MainButton>
        )}
      </Utils>
    </Container>
  );
};

export default memo(ContactCard);
