import type { FC } from 'react';
import { Fragment, memo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TouchableItem from './Item';
import { Main } from './styles';
import type { Props } from './types';

const TabBarBottom: FC<Props> = ({ navigation, state }) => {
  const { bottom: safeBottom } = useSafeAreaInsets();

  return (
    <Main safeBottom={safeBottom}>
      {state.routes.map((route, i) => (
        <Fragment key={route.key}>
          <TouchableItem
            isFocused={i === state.index}
            jumpTo={navigation.navigate}
            routeName={route.name}
            routeKey={route.key}
          />
        </Fragment>
      ))}
    </Main>
  );
};

export default memo(TabBarBottom);
