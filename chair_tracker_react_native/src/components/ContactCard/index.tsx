import type { FC } from 'react';
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

const ContactCard: FC<Props> = ({ isBoss, nombre, apellidos, last_login }) => (
  <Container>
    <SubContainer>
      <Title>{nombre}</Title>
      <Subtitle>{apellidos}</Subtitle>
      <Information>{last_login}</Information>
    </SubContainer>
    <Utils>
      {isBoss ? (
        <>
          <CallButton>
            <CallIcon size={55} />
          </CallButton>
          <ControlButton>
            <AlarmClockIcon size={50} />
          </ControlButton>
        </>
      ) : (
        <MainButton>
          <CallIcon />
        </MainButton>
      )}
    </Utils>
  </Container>
);

export default memo(ContactCard);
