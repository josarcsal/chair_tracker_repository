import { MQTT } from '@env';
import * as Mqtt from 'react-native-native-mqtt';

export const setupMqtt = () => {
  const mqttClient = new Mqtt.Client('tcp://' + MQTT);

  mqttClient.connect(
    {
      clientId: '1001',
      username: 'root',
      password: 'root',
    },
    (err) => {
      console.log(err);
    },
  );

  mqttClient.on(Mqtt.Event.Message, (topic, message) => {
    console.log('Mqtt Message:', topic, message.toString());
  });

  return mqttClient;
};

export default setupMqtt;
