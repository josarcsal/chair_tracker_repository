import type { FC } from 'react';
import { useCallback } from 'react';
import React, { memo } from 'react';
import { IconContainer } from 'components/AlarmCard/styles';
import AlarmClockIcon from 'components/Icons/AlarmClockIcon';
import CrossIcon from 'components/Icons/CrossIcon';
import theme from 'theme';
import { CloseButton, Container, Information, Title } from './styles';
import type { Props } from './types';

const AlarmCard: FC<Props> = ({
  oid_alarma,
  dias,
  t_inicio,
  t_fin,
  t_trabajo,
  t_descanso,
  handleDelete,
}) => {
  const handlePress = useCallback(() => {
    handleDelete(oid_alarma);
  }, [handleDelete, oid_alarma]);
  return (
    <Container>
      <Title>Alarm - {oid_alarma}</Title>
      <CloseButton onPress={handlePress}>
        <CrossIcon />
      </CloseButton>
      <IconContainer>
        <AlarmClockIcon color={theme.colors.deepOcean} size={90} />
      </IconContainer>
      <Information>{dias}</Information>
      <Information>
        {t_inicio} - {t_fin}
      </Information>
      <Information>Working: {t_trabajo} min</Information>
      <Information>Break: {t_descanso} min</Information>
    </Container>
  );
};

export default memo(AlarmCard);
