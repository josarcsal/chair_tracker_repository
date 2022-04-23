import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import type { PagerViewOnPageScrollEvent } from 'react-native-pager-view';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();

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
    handleGoBack,
    onPageScroll,
    currentPage,
  };
};

export default useConnect;
