export type Usuario = {
  apellidos: string;
  contrasena: string;
  hash_mac: string;
  last_login: null | string;
  nif: string;
  nif_jefe: null | string;
  nombre: string;
  rol: string;
};

export type ExisteUsuario = {
  existe: number;
  hash_mac: string;
  nombre: string;
  nif_jefe: string;
};
