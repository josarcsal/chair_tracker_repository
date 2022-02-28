import type { FC } from 'react';
import React, { memo } from 'react';
import CrossIcon from 'components/Icons/CrossIcon';
import { CloseButton, Container, Information, Title } from './styles';
import type { Props } from './types';

const AlarmCard: FC<Props> = () => (
  <Container>
    <Title>Alarm - XX</Title>
    <CloseButton>
      <CrossIcon />
    </CloseButton>
    <Information>L | M | X | J | V </Information>
    <Information>00:00 - 99:99 </Information>
    <Information>Work: 99.99h</Information>
    <Information>Break: 99.99h</Information>
  </Container>
);

export default memo(AlarmCard);
