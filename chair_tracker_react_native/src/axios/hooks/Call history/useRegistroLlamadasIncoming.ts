import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { RegistroLlamada } from 'axios/types/registro';
import { normalizeRegistroLlamada } from 'models/Registros/index';

export const useRegistroLlamadasIncoming = () => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const hashMacUser = '878f387896e2978cf2af1acddf87750a47c431e9';
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'get',
    url: '/registros/llamadas/recibidas/hash_mac',
    headers: {
      'content-type': 'application/json',
    },
    params: { destinatario_hash_mac_fk: hashMacUser },
  });

  const auxData = data || '';
  const normalizedDataIncoming: RegistroLlamada[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedDataIncoming.push(normalizeRegistroLlamada(value));
  });

  return { normalizedDataIncoming, loading, error };
};
