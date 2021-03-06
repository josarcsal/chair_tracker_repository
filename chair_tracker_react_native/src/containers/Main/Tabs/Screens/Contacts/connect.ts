import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useContactsUsuario } from 'axios/hooks/Users/useContactsUsuario';

const useConnect = () => {
  const [hashMac, setHashMac] = useState<string | null>();

  const { normalizedData } = useContactsUsuario(hashMac || '');

  const [nifJefe, setNifJefe] = useState<string | null>();

  async function readValue() {
    const v = await AsyncStorage.getItem('nif_jefe');
    const y = await AsyncStorage.getItem('hash_mac');
    setNifJefe(v);
    setHashMac(y);
  }
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

  const handleAlarm = useCallback(
    (hash_mac: string) => {
      navigate('NewAlarms', { hashMac: hash_mac });
    },
    [navigate],
  );

  return { normalizedData, nifJefe, readValue, handleCall, handleAlarm };
};

export default useConnect;
