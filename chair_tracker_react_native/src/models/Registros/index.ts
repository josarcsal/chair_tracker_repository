import type {
  RegistroAlarma as RegistroAlarmaType,
  RegistroLlamada as RegistroLlamadaType,
} from 'axios/types/registro';

export const normalizeRegistroAlarma = (registro: RegistroAlarmaType) => ({
  oid_reg: registro.oid_reg || 0,
  tipo: registro.tipo || '',
  fecha: registro.fecha || '',
  trabajo: registro.trabajo || 0,
  descanso: registro.descanso || 0,
  oid_alarma_fk: registro.oid_alarma_fk || 0,
  hash_mac_fk: registro.hash_mac_fk || '',
});

export const normalizeRegistroLlamada = (registro: RegistroLlamadaType) => ({
  oid_reg: registro.oid_reg || 0,
  tipo: registro.tipo || '',
  fecha: registro.fecha || '',
  oid_llamada_fk: registro.oid_llamada_fk || 0,
  remitente_hash_mac_fk: registro.remitente_hash_mac_fk || '',
  destinatario_hash_mac_fk: registro.destinatario_hash_mac_fk || '',
});
