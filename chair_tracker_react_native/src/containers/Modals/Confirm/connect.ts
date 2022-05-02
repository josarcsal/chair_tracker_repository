import { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import type { Props } from './types';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();
  const { params: { title, subtitle, handleConfirm } = {} } =
    useRoute<Props['route']>();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  return {
    handleGoBack,
    title,
    subtitle,
    handleConfirm,
  };
};

export default useConnect;
