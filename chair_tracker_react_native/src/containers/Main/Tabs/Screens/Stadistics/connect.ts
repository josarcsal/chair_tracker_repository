import { useState } from 'react';
import { MQTT_ENDPOINT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Mqtt from 'react-native-native-mqtt';
import { useARegistroAlarmaByUserID } from 'axios/hooks/Stats/useRegistroAlarmasByUserID';

const useConnect = () => {
  const [hashMac, setHashMac] = useState<string | null>();

  const { normalizedData, refetch } = useARegistroAlarmaByUserID(2022, hashMac);

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
    mqttClient.subscribe([hashMac + '/registros/refresh'], [0]);
  });

  mqttClient.on(Mqtt.Event.Message, (topic: any, message: any) => {
    console.log('Mqtt Message:', topic, message.toString());
    refetch();
  });

  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }
  return { normalizedData, refetch, readValue };
};

export default useConnect;
