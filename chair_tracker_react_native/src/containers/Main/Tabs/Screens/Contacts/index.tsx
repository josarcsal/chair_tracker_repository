import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ContactCard from 'components/ContactCard';
import MainHeader from 'components/Header/MainHeader';
import { ContactList, Container } from './styles';
import type { Props } from './types';

const Contacts: FC<Props> = () => {
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <Container safeTop={safeTop}>
      <MainHeader title="Contacts" subtitle="Your workmates" />
      <ContactList
        data={['1', '2', '3', '4', '5']}
        renderItem={() => <ContactCard />}
      />
    </Container>
  );
};

export default Contacts;
