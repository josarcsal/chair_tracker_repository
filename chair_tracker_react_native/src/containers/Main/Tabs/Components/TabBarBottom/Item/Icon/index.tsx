import type { FC } from 'react';
import { memo } from 'react';
import AlarmClockIcon from 'components/Icons/AlarmClockIcon';
import AvatarIcon from 'components/Icons/AvatarIcon';
import ChartIcon from 'components/Icons/ChartIcon';
import GroupIcon from 'components/Icons/GroupIcon';
import theme from 'theme';
import type { Props } from './types';

const Icon: FC<Props> = ({ icon, focused }) => {
  const color = focused ? theme.colors.carolinaBlue : theme.colors.black;
  return (
    <>
      {icon === 'Alarms' && <AlarmClockIcon color={color} />}
      {icon === 'Contacts' && <GroupIcon color={color} />}
      {icon === 'Stadistics' && <ChartIcon color={color} />}
      {icon === 'Profile' && <AvatarIcon color={color} />}
    </>
  );
};

export default memo(Icon);
