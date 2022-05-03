import type {
  RegistroAlarma as RegistroAlarmaType,
  RegistroLlamada as RegistroLlamadaType,
} from 'axios/types/registro';

const normalizeDate = (fecha: String) => {
  var normalizedDate = 'No date';
  if (fecha !== 'No date') {
    const date = fecha
      .split('T')[0]
      .split('-')
      .reverse()
      .map((value) => {
        if (value.trim().length === 4) value = value.substring(2, 4);
        return value;
      })
      .join('/');
    const hour = fecha.split('T')[1].substring(0, 5);
    normalizedDate = date + ' | ' + hour;
  }
  return normalizedDate;
};

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
  fecha: normalizeDate(registro.fecha || 'No date'),
  oid_llamada_fk: registro.oid_llamada_fk || 0,
  remitente_hash_mac_fk: registro.remitente_hash_mac_fk || '',
  remitente_nombre: registro.remitente_nombre || '',
  destinatario_hash_mac_fk: registro.destinatario_hash_mac_fk || '',
  destinatario_nombre: registro.destinatario_nombre || '',
  desde: registro.desde || '',
  descripcion: registro.descripcion || '',
});
