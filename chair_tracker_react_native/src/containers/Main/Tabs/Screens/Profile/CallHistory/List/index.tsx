import type { FC } from 'react';
import { useCallback } from 'react';
import type { RegistroLlamada } from 'axios/types/registro';
import CallCard from 'components/CallCard';
import useSafeAreaInsets from 'utils/hooks/useSafeAreaInserts';
import useConnect from './connect';
import { Container, CardList, Divider } from './styles';
import type { CallProps, Props } from './types';

const List: FC<Props> = ({ data }) => {
  const { safeBottom } = useSafeAreaInsets();
  const { handleCall, hashMac, readValue } = useConnect();

  const handleKeyExtractor = (item: RegistroLlamada) => item.oid_reg.toString();
  readValue();
  const handleRenderItem = useCallback(
    ({ item }: CallProps) => (
      <CallCard
        nombre={
          hashMac === item.destinatario_hash_mac_fk
            ? item.remitente_nombre
            : item.destinatario_nombre
        }
        hash_mac={
          hashMac === item.destinatario_hash_mac_fk
            ? item.remitente_hash_mac_fk
            : item.destinatario_hash_mac_fk
        }
        fecha={item.fecha}
        desde={item.desde}
        descripcion={item.descripcion}
        onPress={handleCall}
      />
    ),
    [handleCall, hashMac],
  );

  return (
    <Container>
      <CardList
        // @ts-expect-error
        safeBottom={safeBottom}
        data={data}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
        ItemSeparatorComponent={Divider}
      />
    </Container>
  );
};

export default List;
