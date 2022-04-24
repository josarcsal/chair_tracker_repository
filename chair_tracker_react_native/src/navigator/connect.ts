import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useUsuarioExist } from 'axios/hooks/Users/useUsuarioExist';

const useConnect = () => {
  const { normalizedData } = useUsuarioExist('prueba');
  const { goBack, canGoBack } = useNavigation();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  return { normalizedData, handleGoBack };
};

export default useConnect;
