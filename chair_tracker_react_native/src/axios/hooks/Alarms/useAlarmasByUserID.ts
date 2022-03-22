import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { Alarma } from 'axios/types/alarma';
import { normalizeAlarma } from 'models/Alarma';

export const useAlarmasByUserID = () => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const hashMacUser = '878f387896e2978cf2af1acddf87750a47c431e9';
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'get',
    url: '/alarmas/hash_mac',
    headers: {
      'content-type': 'application/json',
    },
    params: { hash_mac_fk: hashMacUser },
  });

  const auxData = data || '';
  const normalizedData: Alarma[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedData.push(normalizeAlarma(value));
  });

  return { normalizedData, loading, error };
};
