import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { Alarma } from 'axios/types/alarma';
import { normalizeAlarma } from 'models/Alarma';

export const useAlarmas = () => {
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    url: '/alarmas',
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-header-value',
    },
  });

  const auxData = data || '';
  const normalizedData: Alarma[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedData.push(normalizeAlarma(value));
  });

  return { normalizedData, loading, error };
};
