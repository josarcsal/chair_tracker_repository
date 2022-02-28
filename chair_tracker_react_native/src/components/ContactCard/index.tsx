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

const ContactCard: FC<Props> = ({ isBoss }) => (
  <Container>
    <SubContainer>
      <Title>Name</Title>
      <Subtitle>Lastname</Subtitle>
      <Information>Last login</Information>
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
