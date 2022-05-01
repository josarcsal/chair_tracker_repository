import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useARegistroAlarmaByUserID } from 'axios/hooks/Stats/useRegistroAlarmasByUserID';

const useConnect = () => {
  const [hashMac, setHashMac] = useState<string | null>();

  const { normalizedData } = useARegistroAlarmaByUserID(2022, hashMac);

  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }
  return { normalizedData, readValue };
};

export default useConnect;
