import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { Alarma } from 'axios/types/alarma';
import { normalizeAlarma } from 'models/Alarma';

export const useAlarmasByDay = (day?: string, hashMac?: string | null) => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const { data, loading, error, refetch } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    url: '/alarmas/hash_macDia',
    headers: {
      'content-type': 'application/json',
      'X-Custom-Header': 'custom-header-value',
    },
    params: { hash_mac_fk: hashMac, dias: day },
  });

  const auxData = data || '';
  const normalizedData: Alarma[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedData.push(normalizeAlarma(value));
  });

  return { normalizedData, loading, error, refetch };
};
