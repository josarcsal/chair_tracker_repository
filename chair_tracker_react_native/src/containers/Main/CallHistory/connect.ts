import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import type { PagerViewOnPageScrollEvent } from 'react-native-pager-view';
import { useRegistroLlamadasIncoming } from 'axios/hooks/Call history/useRegistroLlamadasIncoming';
import { useRegistroLlamadasOutgoing } from 'axios/hooks/Call history/useRegistroLlamadasOutgoing';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();
  const { normalizedDataIncoming } = useRegistroLlamadasIncoming();
  const { normalizedDataOutgoing } = useRegistroLlamadasOutgoing();

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
  };
};

export default useConnect;
