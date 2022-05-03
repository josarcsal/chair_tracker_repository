import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useAlarmasByHashMac } from 'axios/hooks/Alarms/useAlarmasByHashMac';
// import setupMqtt from 'mqtt/client';

const useConnect = () => {
  const [hashMac, setHashMac] = useState<string | null>();

  const { normalizedData, refetch } = useAlarmasByHashMac(hashMac);
  // setupMqtt();
  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }

  const { navigate } = useNavigation();
  const handleToAddAlarms = useCallback(() => {
    navigate('NewAlarms');
  }, [navigate]);

  const handleDeleteAlarm = useCallback(
    (id: number) => {
      navigate('DeleteModal', {
        title: 'Delete alarm',
        subtitle:
          'Are you sure you want to delete this alarm? You will not be able to restore it but its data will still be use for stadistics',
        id: id,
      });
    },
    [navigate],
  );

  return {
    handleToAddAlarms,
    normalizedData,
    refetch,
    readValue,
    handleDeleteAlarm,
  };
};

export default useConnect;
