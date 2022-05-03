import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useContactsUsuario } from 'axios/hooks/Users/useContactsUsuario';

const useConnect = () => {
  const { normalizedData } = useContactsUsuario();

  const [nifJefe, setNifJefe] = useState<string | null>();

  async function readValue() {
    const v = await AsyncStorage.getItem('nif_jefe');
    setNifJefe(v);
  }
  const { navigate } = useNavigation();

  const handleCall = useCallback(
    (hash_mac: string) => {
      navigate('CallModal', {
        destinatarioHashMac: hash_mac,
      });
    },
    [navigate],
  );

  return { normalizedData, nifJefe, readValue, handleCall };
};

export default useConnect;
