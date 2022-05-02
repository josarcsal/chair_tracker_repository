export type Props = {
  oid_alarma: number;
  dias: string;
  t_inicio: string;
  t_fin: string;
  t_trabajo: number;
  t_descanso: number;
  handleDelete: (id: number) => void;
};
