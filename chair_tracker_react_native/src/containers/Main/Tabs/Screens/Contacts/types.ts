import type { Usuario } from 'axios/types/usuario';
import type { MainStackScreenProps } from 'navigator/types';

export type UserProps = {
  item: Usuario;
  index: number;
};

export type Props = MainStackScreenProps<'Contacts'> & {};
export type ContainerProps = { safeTop: number };
