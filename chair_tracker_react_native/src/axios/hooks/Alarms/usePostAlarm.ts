import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';

export const usePostAlarm = (
  days: string,
  tInicio: string,
  tFin: string,
  tTrabajo: number,
  tDescanso: number,
  cicloTrabajo: number,
  cicloDescanso: number,
  hashMac: string,
) => {
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'post',
    url: '/alarmas/anadirAlarma',
    headers: {
      'content-type': 'application/json',
    },
    data: {
      dias: days,
      t_inicio: tInicio,
      t_fin: tFin,
      t_trabajo: tTrabajo,
      t_descanso: tDescanso,
      ciclo_trabajo: cicloTrabajo,
      ciclo_descanso: cicloDescanso,
      hash_mac_fk: hashMac,
    },
  });

  console.log(data);

  return { data, loading, error };
};
