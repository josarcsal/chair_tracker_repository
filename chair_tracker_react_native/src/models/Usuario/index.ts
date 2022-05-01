import type {
  ExisteUsuario as ExisteUsuarioType,
  Usuario as UsuarioType,
} from 'axios/types/usuario';

const normalizeLogin = (login: String) => {
  var normalizedLogin = 'No last login';
  if (login !== 'No last login') {
    const date = login
      .split('T')[0]
      .split('-')
      .reverse()
      .map((value) => {
        if (value.trim().length === 4) value = value.substring(2, 4);
        return value;
      })
      .join('/');
    const hour = login.split('T')[1].substring(0, 5);
    normalizedLogin = date + ' | ' + hour;
  }
  return normalizedLogin;
};

export const normalizeUsuario = (usuario: UsuarioType) => ({
  apellidos: usuario.apellidos || '',
  contrasena: usuario.contrasena || '',
  hash_mac: usuario.hash_mac || '',
  last_login: normalizeLogin(usuario.last_login || 'No last login'),
  nif: usuario.nif || '',
  nif_jefe: usuario.nif_jefe || '',
  nombre: usuario.nombre || '',
  rol: usuario.rol || '',
});

export const normalizeExisteUsuario = (usuario?: ExisteUsuarioType) => ({
  existe: usuario?.existe || -1,
  hash_mac: usuario?.hash_mac || '',
  nombre: usuario?.nombre || '',
  nif_jefe: usuario?.nif_jefe || '',
});
