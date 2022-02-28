import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';

const useConnect = () => {
  const { navigate } = useNavigation();
  const handleToWorkersList = useCallback(() => {
    navigate('WorkersList');
  }, [navigate]);
  const handleToAboutUs = useCallback(() => {
    navigate('AboutUs');
  }, [navigate]);
  return { handleToWorkersList, handleToAboutUs };
};

export default useConnect;
