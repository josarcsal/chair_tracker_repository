import type { FC } from 'react';
import { useCallback } from 'react';
import ContactCard from 'components/ContactCard';
import useSafeAreaInsets from 'utils/hooks/useSafeAreaInserts';
import { Container, CardList, Divider } from './styles';
import type { Props } from './types';

const List: FC<Props> = ({ data }) => {
  const { safeBottom } = useSafeAreaInsets();

  const keyExtractor = useCallback((item) => item.id, []);

  const handleRenderItem = useCallback(
    ({ item }) => (
      <ContactCard nombre="hola" apellidos="hola" last_login={item} />
    ),
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
