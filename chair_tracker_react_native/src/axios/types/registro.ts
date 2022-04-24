export type RegistroAlarma = {
  oid_reg: number;
  tipo: string;
  fecha: Date;
  trabajo: number;
  descanso: number;
  oid_alarma_fk: number | null;
  hash_mac_fk: string | null;
};

export type RegistroLlamada = {
  oid_reg: number;
  tipo: string;
  fecha: Date;
  oid_llamada_fk: number | null;
  remitente_hash_mac_fk: string | null;
  destinatario_hash_mac_fk: string | null;
};
