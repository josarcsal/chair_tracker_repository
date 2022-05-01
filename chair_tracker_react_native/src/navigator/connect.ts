import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useConnect = () => {
  const [logged, setLogged] = useState<string | null>();
  async function readValue() {
    const v = await AsyncStorage.getItem('logged');
    setLogged(v);
  }

  return { logged, readValue };
};

export default useConnect;
