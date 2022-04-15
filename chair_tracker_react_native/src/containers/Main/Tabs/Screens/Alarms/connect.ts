import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import * as Mqtt from 'react-native-native-mqtt';
import { useAlarmas } from 'axios/hooks/Alarms/useAlarmas';
import setupMqtt from 'mqtt/client';

const useConnect = () => {
  const { normalizedData } = useAlarmas();
  const mqttClient = setupMqtt();

  mqttClient.on(Mqtt.Event.Connect, () => {
    console.log('MQTT Connect');
    mqttClient.subscribe(
      ['878f387896e2978cf2af1acddf87750a47c431e9/alarmas/refresh'],
      [0],
    );
  });

  const { navigate } = useNavigation();
  const handleToAddAlarms = useCallback(() => {
    navigate('NewAlarms');
  }, [navigate]);

  return { handleToAddAlarms, normalizedData };
};

export default useConnect;
