import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { LogicParams } from './types';

const useLogic = ({ jumpTo, routeName }: LogicParams) => {
  const { t } = useTranslation();

  const onPress = useCallback(() => {
    jumpTo(routeName);
  }, [jumpTo, routeName]);

  const title = useMemo(() => {
    if (routeName === 'Stadistics') return t('alerts');
    if (routeName === 'Profile') return t('discover');
    if (routeName === 'Contacts') return t('feed');
    if (routeName === 'Alarms') return t('home');

    return '';
  }, [routeName, t]);

  return { title, onPress };
};

export default useLogic;
