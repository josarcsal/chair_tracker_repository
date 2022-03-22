import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAlarmas } from 'axios/hooks/Alarms/useAlarmas';

const useConnect = () => {
  const { normalizedData } = useAlarmas();
  const { navigate } = useNavigation();
  const handleToAddAlarms = useCallback(() => {
    navigate('NewAlarms');
  }, [navigate]);

  return { handleToAddAlarms, normalizedData };
};

export default useConnect;
