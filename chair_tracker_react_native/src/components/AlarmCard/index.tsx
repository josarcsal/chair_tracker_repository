import type { FC } from 'react';
import React, { memo } from 'react';
import { PlusIcon } from 'components';
import { CloseButton, Container, Information, Title } from './styles';
import type { Props } from './types';

const AlarmCard: FC<Props> = ({
  oid_alarma,
  dias,
  t_inicio,
  t_fin,
  t_trabajo,
  t_descanso,
}) => (
  <Container>
    <Title>Alarm - {oid_alarma}</Title>
    <CloseButton>
      <PlusIcon />
    </CloseButton>
    <Information>{dias}</Information>
    <Information>
      {t_inicio} - {t_fin}
    </Information>
    <Information>Working: {t_trabajo} min</Information>
    <Information>Break: {t_descanso} min</Information>
  </Container>
);

export default memo(AlarmCard);
