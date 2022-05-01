import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import RNRestart from 'react-native-restart';
import { useUsuarioExist } from 'axios/hooks/Users/useUsuarioExist';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();

  const [nif, setNif] = useState('');
  const [password, setPassword] = useState('');
  const { normalizedData } = useUsuarioExist(nif, password);

  useEffect(() => {
    AsyncStorage.setItem('logged', normalizedData.existe.toString());
    AsyncStorage.setItem('hash_mac', normalizedData.hash_mac);
    AsyncStorage.setItem('nombre', normalizedData.nombre);
    AsyncStorage.setItem('nif_jefe', normalizedData.nif_jefe);
    if (normalizedData.existe === 1) {
      RNRestart.Restart();
    }
  });

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  return { handleGoBack, nif, setNif, setPassword };
};

export default useConnect;
