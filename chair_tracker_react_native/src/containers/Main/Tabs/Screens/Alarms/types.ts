import type { Alarma } from 'axios/types/alarma';
import type { MainStackScreenProps } from 'navigator/types';

export type AlarmProps = {
  item: Alarma;
  index: number;
};

export type Props = MainStackScreenProps<'Alarms'> & {};
