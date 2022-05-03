export type Props = {
  isBoss?: boolean;
  apellidos: string;
  last_login: string | null;
  nombre: string;
  hash_mac: string;
  onPress: (hash_mac: string) => void;
};
