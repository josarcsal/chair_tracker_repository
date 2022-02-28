import type { FC } from 'react';
import ContactCard from 'components/ContactCard';
import MainHeader from 'components/Header/MainHeader';
import { ContactList, Container } from './styles';
import type { Props } from './types';

const Contacts: FC<Props> = () => (
  <Container>
    <MainHeader title="Contacts" subtitle="Your workmates" />
    <ContactList
      data={['1', '2', '3', '4', '5']}
      renderItem={() => <ContactCard />}
    />
  </Container>
);

export default Contacts;
