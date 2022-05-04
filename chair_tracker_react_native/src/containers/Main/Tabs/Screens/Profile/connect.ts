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
  const [hashMacUser, sethashMacUser] = useState<string | null>();

  async function readValue() {
    const v = await AsyncStorage.getItem('nombre');
    const y = await AsyncStorage.getItem('nif_jefe');
    const x = await AsyncStorage.getItem('hash_mac');
    setNombre(v);
    setNifJefe(y);
    sethashMacUser(x);
  }

  const handleToAlarmsDayModal = useCallback(
    (date) => {
      const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
      navigate('AlarmsDayModal', {
        days: days[new Date(date.dateString).getDay()],
        hashMac: hashMacUser || '',
      });
    },
    [hashMacUser, navigate],
  );

  return {
    handleToCallHistory,
    handleToAboutUs,
    readValue,
    nombre,
    nifJefe,
    handleToTermsAndConditions,
    handleToAlarmsDayModal,
  };
};

export default useConnect;
