import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { RegistroAlarma } from 'axios/types/registro';
import { normalizeRegistroAlarma } from 'models/Registros/index';

export const useARegistroAlarmaByUserID = (
  anyo: number,
  hashMac?: string | null,
) => {
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'get',
    url: '/registros/alarmas/hash_macAnyo',
    headers: {
      'content-type': 'application/json',
    },
    params: { hash_mac_fk: hashMac, anyo: anyo },
  });

  const auxData = data || '';
  const normalizedData: RegistroAlarma[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedData.push(normalizeRegistroAlarma(value));
  });

  return { normalizedData, loading, error };
};
