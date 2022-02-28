import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';

const useConnect = () => {
  const { navigate } = useNavigation();
  const handleToAddAlarms = useCallback(() => {
    navigate('NewAlarms');
  }, [navigate]);
  return { handleToAddAlarms };
};

export default useConnect;
