import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

const useConnect = () => {
  const { navigate } = useNavigation();

  const handleCall = useCallback(
    (hash_mac: string, nombre: string) => {
      navigate('CallModal', {
        destinatarioHashMac: hash_mac,
        destinatarioNombre: nombre,
      });
    },
    [navigate],
  );

  const [hashMac, setHashMac] = useState<string | null>();
  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }

  return { handleCall, readValue, hashMac };
};

export default useConnect;
