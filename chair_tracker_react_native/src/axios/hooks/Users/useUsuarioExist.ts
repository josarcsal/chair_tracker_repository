import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { ExisteUsuario } from 'axios/types/usuario';
import { normalizeExisteUsuario } from 'models/Usuario/index';

export const useUsuarioExist = (nif: string, contrasena: string) => {
  const { data, loading, error } = useAxios<ExisteUsuario>({
    baseURL: AXIOS_ENDPOINT,
    url: '/usuarios/existeUsuario',
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-header-value',
    },
    params: { nif: nif, contrasena: contrasena },
  });

  const normalizedData = normalizeExisteUsuario(data);

  return { normalizedData, loading, error };
};
