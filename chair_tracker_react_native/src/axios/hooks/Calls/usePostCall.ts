import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';

export const usePostCall = (
  oid_llamada: string,
  estado: string,
  desde: string,
  descripcion: string,
  remitente_hash_mac_fk: string,
  destinatario_hash_mac_fk: string,
) => {
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'post',
    url: '/llamadas/anadirLlamada',
    headers: {
      'content-type': 'application/json',
    },
    data: {
      oid_llamada: oid_llamada,
      estado: estado,
      desde: desde,
      descripcion: descripcion,
      remitente_hash_mac_fk: remitente_hash_mac_fk,
      destinatario_hash_mac_fk: destinatario_hash_mac_fk,
    },
  });
  return { data, loading, error };
};
