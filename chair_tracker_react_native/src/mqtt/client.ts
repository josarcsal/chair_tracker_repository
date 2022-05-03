import { MQTT_ENDPOINT } from '@env';
import MQTT from 'sp-react-native-mqtt';

export const setupMqtt = () => {
  console.log(MQTT_ENDPOINT);
  const MqttClient = MQTT.createClient({
    uri: 'mqtt://' + MQTT_ENDPOINT,
    clientId: '1001',
  })
    .then(function (client) {
      client.on('closed', function () {
        console.log('mqtt.event.closed');
      });

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg);
      });

      client.on('message', function (msg) {
        console.log('mqtt.event.message', msg);
      });

      client.on('connect', function () {
        console.log('connected');
        client.subscribe('/data', 0);
        client.publish('/data', 'test', 0, false);
      });

      client.connect();

      client.subscribe('/mac123/alarmas', 0);
    })
    .catch(function (err) {
      console.log(err);
    });
  return MqttClient;
};

export default setupMqtt;
