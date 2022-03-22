import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAlarmas } from 'axios/hooks/Alarms/useAlarmas';

const useConnect = () => {
  const { normalizedData } = useAlarmas();
  // const { data } = usePostAlarm(
  //   'LSDMX',
  //   'PT18H10M30S',
  //   'PT18H13M',
  //   1,
  //   2,
  //   0,
  //   0,
  //   '878f387896e2978cf2af1acddf87750a47c431e9',
  // );
  const { navigate } = useNavigation();
  const handleToAddAlarms = useCallback(() => {
    navigate('NewAlarms');
  }, [navigate]);

  return { handleToAddAlarms, normalizedData };
};

export default useConnect;
