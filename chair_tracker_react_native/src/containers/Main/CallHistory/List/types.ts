import type { RegistroLlamada } from 'axios/types/registro';

export type Props = {
  data: RegistroLlamada[];
};

export type CardItemProps = {
  fecha: Date;
  remitente_hash_mac_fk: string;
  destinatario_hash_mac_fk: string;
};

export type RenderItemProps = {
  index: number;
  item: CardItemProps;
};

export type ListProps = { safeBottom: number };
