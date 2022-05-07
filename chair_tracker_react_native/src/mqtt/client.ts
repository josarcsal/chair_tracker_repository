import { MQTT_ENDPOINT } from '@env';
import * as Mqtt from 'react-native-native-mqtt';

export const setupMqtt = () => {
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

  mqttClient.on(Mqtt.Event.Message, (topic: any, message: any) => {
    console.log('Mqtt Message:', topic, message.toString());
  });

  return mqttClient;
};

export default setupMqtt;
