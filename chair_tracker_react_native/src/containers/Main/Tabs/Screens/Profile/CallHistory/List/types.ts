import type { RegistroLlamada } from 'axios/types/registro';

export type Props = {
  data: RegistroLlamada[];
};

export type CallProps = {
  index: number;
  item: RegistroLlamada;
};

export type ListProps = { safeBottom: number };
