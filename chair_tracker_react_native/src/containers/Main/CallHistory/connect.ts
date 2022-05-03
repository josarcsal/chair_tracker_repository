import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
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
  const { normalizedDataIncoming } = useRegistroLlamadasIncoming(hashMac);
  const { normalizedDataOutgoing } = useRegistroLlamadasOutgoing(hashMac);

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
    normalizedDataIncoming,
    normalizedDataOutgoing,
    handleGoBack,
    onPageScroll,
    currentPage,
    readValue,
  };
};

export default useConnect;
