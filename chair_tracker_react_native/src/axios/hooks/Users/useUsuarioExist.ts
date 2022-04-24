import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';
import type { ExisteUsuario } from 'axios/types/usuario';
import { normalizeExisteUsuario } from 'models/Usuario/index';

export const useUsuarioExist = (contrasena: string) => {
  //DEBEMOS RECOGER LA MAC DE LA PLACA DEL USER Y ALMACENARLA
  const hashMacUser = '878f387896e2978cf2af1acddf87750a47c431e9';
  // const contrasena = 'prueba';

  const { data, loading, error } = useAxios<ExisteUsuario>({
    baseURL: AXIOS_ENDPOINT,
    url: '/usuarios/existeUsuario',
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-header-value',
    },
    params: { hash_mac: hashMacUser, contrasena: contrasena },
  });

  const normalizedData = normalizeExisteUsuario(data);

  return { normalizedData, loading, error };
};
