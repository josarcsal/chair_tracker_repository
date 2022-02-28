import type { FC } from 'react';
import { memo } from 'react';
import { PlusIcon } from 'components/Icons';
import theme from 'theme';
import type { Props } from './types';

const Icon: FC<Props> = ({ icon, focused }) => {
  const color = focused ? theme.colors.carolinaBlue : theme.colors.black;
  return (
    <>
      {icon === 'Alarms' && <PlusIcon color={color} />}
      {icon === 'Contacts' && <PlusIcon color={color} />}
      {icon === 'Stadistics' && <PlusIcon color={color} />}
      {icon === 'Profile' && <PlusIcon color={color} />}
    </>
  );
};

export default memo(Icon);
