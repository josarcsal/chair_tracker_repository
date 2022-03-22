import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';

export const useDeleteAlarmByID = (oidAlarma: number) => {
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'delete',
    url: '/alarmas/borrarAlarma',
    headers: {
      'content-type': 'application/json',
    },
    data: { oid_alarma: oidAlarma },
  });

  return { data, loading, error };
};
