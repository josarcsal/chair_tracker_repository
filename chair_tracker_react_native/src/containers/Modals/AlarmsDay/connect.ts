import { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useAlarmasByDay } from 'axios/hooks/Alarms/useAlarmasByDay';
import type { Props } from './types';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();
  const { params: { hashMac, days } = {} } = useRoute<Props['route']>();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const { normalizedData } = useAlarmasByDay(days, hashMac);

  return {
    handleGoBack,
    normalizedData,
  };
};

export default useConnect;
