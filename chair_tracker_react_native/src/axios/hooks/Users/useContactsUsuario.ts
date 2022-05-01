import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { Usuario } from 'axios/types/usuario';
import { normalizeUsuario } from 'models/Usuario/index';

export const useContactsUsuario = () => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const hashMacUser = 'mac456';
  // const contrasena = 'prueba';

  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    url: '/usuarios/contactos',
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-header-value',
    },
    params: { hash_mac: hashMacUser },
  });

  const auxData = data || '';
  const normalizedData: Usuario[] = [];

  Object.values(auxData).forEach((value) => {
    normalizedData.push(normalizeUsuario(value));
  });

  return { normalizedData, loading, error };
};
