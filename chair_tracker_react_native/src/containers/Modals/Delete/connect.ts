import { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useDeleteAlarmByID } from 'axios/hooks/Alarms/useDeleteAlarmByID';
import type { Props } from './types';

const useConnect = () => {
  const { goBack, canGoBack } = useNavigation();
  const { params: { title, subtitle, id } = {} } = useRoute<Props['route']>();

  const handleGoBack = useCallback(() => {
    if (canGoBack()) {
      goBack();
    }
  }, [canGoBack, goBack]);

  const [oidAlarm, setOidAlarm] = useState('');

  useDeleteAlarmByID(oidAlarm);

  const handleDelete = useCallback(() => {
    setOidAlarm(id?.toString() || '');
  }, [id]);

  return {
    handleGoBack,
    title,
    subtitle,
    handleDelete,
    oidAlarm,
  };
};

export default useConnect;
