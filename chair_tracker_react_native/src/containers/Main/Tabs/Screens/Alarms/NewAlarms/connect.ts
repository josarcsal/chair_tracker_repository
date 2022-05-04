import { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { usePostAlarm } from 'axios/hooks/Alarms/usePostAlarm';
import type { Alarma } from 'axios/types/alarma';
import type { Props } from './types';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const { params: { hashMac } = {} } = useRoute<Props['route']>();

  const [newAlarm, setNewAlarm] = useState<Alarma>();

  const normalizedHour = (hour: string) => {
    var aux = 'PT';
    var time = hour.split(':');
    var h = time[0];
    var m = time[1];
    var s = time[2].substring(0, 1);
    return aux + h + 'H' + m + 'M' + s + 'S';
  };

  usePostAlarm(
    newAlarm?.dias || '',
    newAlarm?.t_inicio || '',
    newAlarm?.t_fin || '',
    newAlarm?.t_trabajo || 0,
    newAlarm?.t_descanso || 0,
    newAlarm?.ciclo_trabajo || 0,
    newAlarm?.ciclo_descanso || 0,
    newAlarm?.hash_mac_fk || '',
  );

  return {
    handleGoBack,
    setNewAlarm,
    newAlarm,
    normalizedHour,
    hashMac,
  };
};

export default useConnect;
