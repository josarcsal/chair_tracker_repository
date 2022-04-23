import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { RegistroAlarma } from 'axios/types/registro';
import { normalizeRegistroAlarma } from 'models/Registros/index';

export const useARegistroAlarmaByUserID = (anyo: number) => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const hashMacUser = '878f387896e2978cf2af1acddf87750a47c431e9';
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'get',
    url: '/registros/alarmas/hash_macAnyo',
    headers: {
      'content-type': 'application/json',
    },
    params: { hash_mac_fk: hashMacUser, anyo: anyo },
  });

  const auxData = data || '';
  const normalizedData: RegistroAlarma[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedData.push(normalizeRegistroAlarma(value));
  });

  return { normalizedData, loading, error };
};
