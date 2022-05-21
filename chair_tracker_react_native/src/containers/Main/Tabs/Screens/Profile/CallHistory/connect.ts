import { useCallback, useState } from 'react';
import { MQTT_ENDPOINT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import * as Mqtt from 'react-native-native-mqtt';
import type { PagerViewOnPageScrollEvent } from 'react-native-pager-view';
import { useRegistroLlamadasIncoming } from 'axios/hooks/Call history/useRegistroLlamadasIncoming';
import { useRegistroLlamadasOutgoing } from 'axios/hooks/Call history/useRegistroLlamadasOutgoing';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();

  const [hashMac, setHashMac] = useState<string | null>();
  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }
  const { normalizedDataIncoming, refetchIncoming } =
    useRegistroLlamadasIncoming(hashMac);
  const { normalizedDataOutgoing, refetchOutgoing } =
    useRegistroLlamadasOutgoing(hashMac);

  const finalDataIncoming = normalizedDataIncoming.reverse();
  const finalDataOutgoing = normalizedDataOutgoing.reverse();

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
    mqttClient.subscribe([hashMac + '/llamadas/recibidas'], [0]);
    mqttClient.subscribe([hashMac + '/llamadas/enviadas'], [0]);
  });

  mqttClient.on(Mqtt.Event.Message, (topic: any, message: any) => {
    console.log('Mqtt Message:', topic, message.toString());
    refetchIncoming();
    refetchOutgoing();
  });

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const [currentPage, setCurrentPage] = useState(0);

  const onPageScroll = (event: PagerViewOnPageScrollEvent) => {
    const { position } = event.nativeEvent;
    if (position !== currentPage) {
      setCurrentPage(position);
    }
  };

  return {
    finalDataIncoming,
    finalDataOutgoing,
    handleGoBack,
    onPageScroll,
    currentPage,
    readValue,
  };
};

export default useConnect;
