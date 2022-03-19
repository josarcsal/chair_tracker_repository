import type { Alarma as AlarmaType } from 'axios/types/alarma';

export const normalizeAlarma = (alarma: AlarmaType) => ({
  oid_alarma: alarma.oid_alarma,
  dias: alarma.dias,
  t_inicio: alarma.t_inicio,
  t_fin: alarma.t_fin,
  t_trabajo: alarma.t_trabajo,
  t_descanso: alarma.t_descanso,
  ciclo_trabajo: alarma.ciclo_trabajo,
  ciclo_descanso: alarma.ciclo_descanso,
  hash_mac_fk: alarma.hash_mac_fk,
});
