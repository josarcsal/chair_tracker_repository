import type { Alarma as AlarmaType } from 'axios/types/alarma';

const normalizeTime = (time: String) => {
  const aux = time.replace('PT', '').replace('H', ':').replace('M', ':').trim();
  const normalizedTime = aux
    .split(':')
    .map((value) => {
      if (value.length < 2) value = '0' + value;
      return value;
    })
    .join(':')
    .substring(0, 5);
  return normalizedTime;
};

const normalizeDays = (days: String) => {
  const aux = [...days]
    .map((value) => value + ' | ')
    .join('')
    .trim();
  const normalizedDays = aux.substring(0, aux.length - 1);
  return normalizedDays;
};

export const normalizeAlarma = (alarma: AlarmaType) => ({
  oid_alarma: alarma.oid_alarma || 0,
  dias: normalizeDays(alarma.dias) || '',
  t_inicio: normalizeTime(alarma.t_inicio) || '',
  t_fin: normalizeTime(alarma.t_fin) || '',
  t_trabajo: alarma.t_trabajo || 0,
  t_descanso: alarma.t_descanso || 0,
  ciclo_trabajo: alarma.ciclo_trabajo || 0,
  ciclo_descanso: alarma.ciclo_descanso || 0,
  hash_mac_fk: alarma.hash_mac_fk || '',
});
