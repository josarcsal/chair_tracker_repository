import { AXIOS_ENDPOINT } from '@env';
import { useAxios } from 'use-axios-client';

export const useDeleteAlarmByID = (oid_alarma: string) => {
  const { data, loading, error } = useAxios<JSON>({
    baseURL: AXIOS_ENDPOINT,
    method: 'delete',
    url: '/alarmas/borrarAlarma',
    headers: {
      'content-type': 'application/json',
    },
    data: { oid_alarma: oid_alarma },
  });

  return { data, loading, error };
};
