import type { FC } from 'react';
import React, { memo } from 'react';
import {
  Container,
  Divider,
  Information,
  InformationView,
  Title,
} from './styles';
import type { Props } from './types';

const AlarmDayCard: FC<Props> = ({ oid_alarma, dias, t_inicio, t_fin }) => (
  <Container>
    <Title>Alarm - {oid_alarma}</Title>
    <InformationView>
      <Information>
        {t_inicio} - {t_fin}
      </Information>
      <Information>{dias}</Information>
    </InformationView>
    <Divider />
  </Container>
);

export default memo(AlarmDayCard);
