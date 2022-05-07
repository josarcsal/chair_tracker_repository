import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import * as Mqtt from 'react-native-native-mqtt';
import { useAlarmasByHashMac } from 'axios/hooks/Alarms/useAlarmasByHashMac';
import setupMqtt from 'mqtt/client';

const useConnect = () => {
  const [hashMac, setHashMac] = useState<string | null>();

  const { normalizedData, refetch } = useAlarmasByHashMac(hashMac);
  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }

  const mqttClient = setupMqtt();

  mqttClient.on(Mqtt.Event.Connect, () => {
    console.log('MQTT Connect');
    mqttClient.subscribe(['mac1/alarmas/refresh'], [0]);
  });

  const { navigate } = useNavigation();
  const handleToAddAlarms = useCallback(() => {
    navigate('NewAlarms', { hashMac: hashMac || '' });
  }, [hashMac, navigate]);

  const handleDeleteAlarm = useCallback(
    (id: number) => {
      navigate('DeleteModal', {
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
