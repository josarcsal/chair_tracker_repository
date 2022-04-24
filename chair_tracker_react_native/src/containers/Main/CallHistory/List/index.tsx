import type { FC } from 'react';
import { useCallback } from 'react';

import CallCard from 'components/CallCard';
import useSafeAreaInsets from 'utils/hooks/useSafeAreaInserts';
import { Container, CardList, Divider } from './styles';
import type { Props } from './types';

const List: FC<Props> = ({ data }) => {
  const { safeBottom } = useSafeAreaInsets();

  const keyExtractor = useCallback((item) => item.id, []);

  const handleRenderItem = useCallback(
    () => <CallCard nombre="El pepe" apellidos="culon" fecha={'01/01/2022'} />,
    [],
  );

  return (
    <Container>
      <CardList
        // @ts-expect-error
        safeBottom={safeBottom}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={handleRenderItem}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  );
};

export default List;
