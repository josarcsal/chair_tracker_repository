import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import * as Mqtt from 'react-native-native-mqtt';
import { useAlarmasByHashMac } from 'axios/hooks/Alarms/useAlarmasByUserID';
import setupMqtt from 'mqtt/client';

const useConnect = () => {
  const [hashMac, setHashMac] = useState<string | null>();
  console.log(hashMac);

  const { normalizedData } = useAlarmasByHashMac(hashMac);
  const mqttClient = setupMqtt();

  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }

  mqttClient.on(Mqtt.Event.Connect, () => {
    console.log('MQTT Connect');
    mqttClient.subscribe([hashMac + '/alarmas/refresh'], [0]);
  });

  const { navigate } = useNavigation();
  const handleToAddAlarms = useCallback(() => {
    navigate('NewAlarms');
  }, [navigate]);

  return { handleToAddAlarms, normalizedData, readValue };
};

export default useConnect;
