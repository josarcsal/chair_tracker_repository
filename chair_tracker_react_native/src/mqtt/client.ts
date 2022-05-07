import { MQTT_ENDPOINT } from '@env';
import * as Mqtt from 'react-native-native-mqtt';

export const setupMqtt = () => {
  const mqttClient = new Mqtt.Client('tcp://' + MQTT_ENDPOINT);

  mqttClient
    .connect({
      clientId: '1001',
      username: 'root',
      password: 'root',
      allowUntrustedCA: true,
    })
    .then(function (client: any) {
      client.on(Mqtt.Event.Message, (topic: string, message: Buffer) => {
        console.log('Mqtt Message:', topic, message.toString());
      });

      client.on(Mqtt.Event.Connect, () => {
        console.log('MQTT Connect');
        // client.subscribe(['mac1/alarmas/refresh'], [0]);
      });

      client.on(Mqtt.Event.Error, (error: string) => {
        console.log('MQTT Error:', error);
      });

      client.on(Mqtt.Event.Disconnect, (cause: string) => {
        console.log('MQTT Disconnect:', cause);
      });
    })
    .catch(function (err: any) {
      console.log(err);
    });
  return mqttClient;
};

export default setupMqtt;
