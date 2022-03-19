import type { FC } from 'react';
import { useCallback } from 'react';
import type { Usuario } from 'axios/types/usuario';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ContactCard from 'components/ContactCard';
import MainHeader from 'components/Header/MainHeader';
import useConnect from './connect';
import { ContactList, Container } from './styles';
import type { UserProps } from './types';
import type { Props } from './types';

const Contacts: FC<Props> = () => {
  const { normalizedData } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();
  const handleKeyExtractor = (item: Usuario) => item.hash_mac;
  const handleRenderItem = useCallback(
    ({ item }: UserProps) => (
      <ContactCard
        nombre={item.nombre}
        apellidos={item.apellidos}
        last_login={item.last_login}
      />
    ),
    [],
  );
  return (
    <Container safeTop={safeTop}>
      <MainHeader title="Contacts" subtitle="Your workmates" />
      <ContactList
        data={normalizedData}
        keyExtractor={handleKeyExtractor}
        renderItem={handleRenderItem}
      />
    </Container>
  );
};

export default Contacts;
