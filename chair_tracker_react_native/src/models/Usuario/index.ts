import type { Usuario as UsuarioType } from 'axios/types/usuario';

export const normalizeUsuario = (usuario: UsuarioType) => ({
  apellidos: usuario?.apellidos,
  contrasena: usuario?.contrasena,
  hash_mac: usuario?.hash_mac,
  last_login: usuario?.last_login || 'No last login',
  nif: usuario?.nif,
  nif_jefe: usuario?.nif_jefe,
  nombre: usuario?.nombre,
  rol: usuario?.rol,
});
