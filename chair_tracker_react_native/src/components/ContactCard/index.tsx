import type { FC } from 'react';
import React, { memo } from 'react';
import { PlusIcon } from 'components';
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
            <PlusIcon />
          </CallButton>
          <ControlButton>
            <PlusIcon />
          </ControlButton>
        </>
      ) : (
        <MainButton>
          <PlusIcon />
        </MainButton>
      )}
    </Utils>
  </Container>
);

export default memo(ContactCard);
