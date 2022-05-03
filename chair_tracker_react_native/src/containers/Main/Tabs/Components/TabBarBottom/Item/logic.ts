import { useCallback, useMemo } from 'react';
import type { LogicParams } from './types';

const useLogic = ({ jumpTo, routeName }: LogicParams) => {
  const onPress = useCallback(() => {
    jumpTo(routeName);
  }, [jumpTo, routeName]);

  const title = useMemo(() => {
    if (routeName === 'Stadistics') return 'Stadistics';
    if (routeName === 'Profile') return 'Profile';
    if (routeName === 'Contacts') return 'Contacts';
    if (routeName === 'Alarms') return 'Alarms';

    return '';
  }, [routeName]);

  return { title, onPress };
};

export default useLogic;
