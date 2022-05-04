export type Props = {
  nombre: string | null;
  hash_mac: string | null;
  fecha: string | null;
  desde: string | null;
  descripcion: string | null;
  onPress: (id: string) => void;
};
