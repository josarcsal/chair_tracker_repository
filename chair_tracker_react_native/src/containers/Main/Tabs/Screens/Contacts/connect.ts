import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContactsUsuario } from 'axios/hooks/Users/useContactsUsuario';

const useConnect = () => {
  const { normalizedData } = useContactsUsuario();

  const [nifJefe, setNifJefe] = useState<string | null>();

  async function readValue() {
    const v = await AsyncStorage.getItem('nif_jefe');
    setNifJefe(v);
  }

  return { normalizedData, nifJefe, readValue };
};

export default useConnect;
