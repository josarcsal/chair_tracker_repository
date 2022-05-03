import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { RegistroLlamada } from 'axios/types/registro';
import { normalizeRegistroLlamada } from 'models/Registros/index';

export const useRegistroLlamadasOutgoing = (hashMac?: string | null) => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'get',
    url: '/registros/llamadas/enviadas/hash_mac',
    headers: {
      'content-type': 'application/json',
    },
    params: { remitente_hash_mac_fk: hashMac },
  });

  const auxData = data || '';
  const normalizedDataOutgoing: RegistroLlamada[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedDataOutgoing.push(normalizeRegistroLlamada(value));
  });

  return { normalizedDataOutgoing, loading, error };
};
