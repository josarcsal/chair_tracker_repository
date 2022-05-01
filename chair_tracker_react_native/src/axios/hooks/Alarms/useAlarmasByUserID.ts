import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { Alarma } from 'axios/types/alarma';
import { normalizeAlarma } from 'models/Alarma';

export const useAlarmasByHashMac = (hashMac?: string | null) => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'get',
    url: '/alarmas/hash_mac',
    headers: {
      'content-type': 'application/json',
    },
    params: { hash_mac_fk: hashMac },
  });

  const auxData = data || '';
  const normalizedData: Alarma[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedData.push(normalizeAlarma(value));
  });

  return { normalizedData, loading, error };
};
