import type { FC } from 'react';
import React, { memo } from 'react';
import CallIcon from 'components/Icons/CallIcon';
import { Container, MainButton, SubContainer, Subtitle, Title } from './styles';
import type { Props } from './types';

const ContactCard: FC<Props> = ({ nombre, apellidos, fecha }) => (
  <Container>
    <SubContainer>
      <Title>
        {nombre} {apellidos}
      </Title>
      <Subtitle>{fecha}</Subtitle>
    </SubContainer>
    <MainButton>
      <CallIcon size={36} />
    </MainButton>
  </Container>
);

export default memo(ContactCard);
