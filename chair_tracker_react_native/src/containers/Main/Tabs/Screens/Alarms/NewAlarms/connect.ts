import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { usePostAlarm } from 'axios/hooks/Alarms/usePostAlarm';
import type { Alarma } from 'axios/types/alarma';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const [hashMac, setHashMac] = useState<string | null>();
  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }

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
    readValue,
  };
};

export default useConnect;
