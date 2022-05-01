import type { RegistroAlarma } from 'axios/types/registro';
import type { MainStackScreenProps } from 'navigator/types';

export type StadisticsProps = {
  item: RegistroAlarma;
  index: number;
};
export type Props = MainStackScreenProps<'Stadistics'> & {};
export type ContainerProps = { safeTop: number };
