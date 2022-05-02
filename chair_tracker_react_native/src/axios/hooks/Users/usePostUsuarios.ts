import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';

export const usePostUsuarios = (
  hash_mac: string,
  nif: string,
  contrasena: string,
  last_login: string | null,
  nombre: string,
  apellidos: string,
  rol: string,
  nif_jefe: string | null,
) => {
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'post',
    url: '/usuarios/anadirUsuario',
    headers: {
      'content-type': 'application/json',
    },
    data: {
      hash_mac: hash_mac,
      nif: nif,
      contrasena: contrasena,
      last_login: last_login,
      nombre: nombre,
      apellidos: apellidos,
      rol: rol,
      nif_jefe: nif_jefe,
    },
  });
  return { data, loading, error };
};
