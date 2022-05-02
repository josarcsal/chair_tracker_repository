import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

const useConnect = () => {
  const { navigate } = useNavigation();
  const handleToCallHistory = useCallback(() => {
    navigate('CallHistory');
  }, [navigate]);

  const handleToAboutUs = useCallback(() => {
    navigate('AboutUs');
  }, [navigate]);

  const handleToTermsAndConditions = useCallback(() => {
    navigate('TermsAndConditions');
  }, [navigate]);

  const [nombre, setNombre] = useState<string | null>();
  const [nifJefe, setNifJefe] = useState<string | null>();

  async function readValue() {
    const v = await AsyncStorage.getItem('nombre');
    const y = await AsyncStorage.getItem('nif_jefe');
    setNombre(v);
    setNifJefe(y);
  }

  return {
    handleToCallHistory,
    handleToAboutUs,
    readValue,
    nombre,
    nifJefe,
    handleToTermsAndConditions,
  };
};

export default useConnect;
