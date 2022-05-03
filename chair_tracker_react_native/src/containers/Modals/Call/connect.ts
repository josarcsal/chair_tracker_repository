import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/core';
import { usePostCall } from 'axios/hooks/Calls/usePostCall';
import type { Props } from './types';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();
  const { params: { destinatarioHashMac } = {} } = useRoute<Props['route']>();

  const [hashMac, setHashMac] = useState<string | null>();

  async function readValue() {
    const v = await AsyncStorage.getItem('hash_mac');
    setHashMac(v);
  }

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const [state, setState] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');

  usePostCall(
    '0',
    state,
    from,
    message,
    hashMac || '',
    destinatarioHashMac || '',
  );

  return {
    handleGoBack,
    destinatarioHashMac,
    setState,
    setFrom,
    setMessage,
    readValue,
    message,
  };
};

export default useConnect;
