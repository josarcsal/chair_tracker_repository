import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';

const useConnect = () => {
  const { navigate } = useNavigation();
  const handleToCallHistory = useCallback(() => {
    navigate('CallHistory');
  }, [navigate]);
  const handleToAboutUs = useCallback(() => {
    navigate('AboutUs');
  }, [navigate]);
  return { handleToCallHistory, handleToAboutUs };
};

export default useConnect;
