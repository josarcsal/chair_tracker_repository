import { useCallback, useState } from 'react';
import { MQTT_ENDPOINT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import * as Mqtt from 'react-native-native-mqtt';
import { useAlarmasByHashMac } from 'axios/hooks/Alarms/useAlarmasByHashMac';

const useConnect = () => {
  const [hashMac, setHashMac] = useState<string | null>();

  const { normalizedData, refetch } = useAlarmasByHashMac(hashMac);
  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }

  const mqttClient = new Mqtt.Client('tcp://' + MQTT_ENDPOINT);

  mqttClient.connect(
    {
      clientId: '1001',
      username: 'root',
      password: 'root',
    },
    (err: any) => {
      console.log(err);
    },
  );

  mqttClient.on(Mqtt.Event.Connect, () => {
    mqttClient.subscribe([hashMac + '/alarmas/refresh'], [0]);
    mqttClient.subscribe(['null/alarmas/refresh'], [0]);
  });

  mqttClient.on(Mqtt.Event.Message, (topic: any, message: any) => {
    console.log('Mqtt Message:', topic, message.toString());
    refetch();
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
