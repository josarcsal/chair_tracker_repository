export type Props = {
  isBoss?: boolean;
  apellidos: string;
  last_login: string | null;
  nombre: string;
  hash_mac: string;
  onCall: (hash_mac: string) => void;
  onAlarm: (hash_mac: string) => void;
};
