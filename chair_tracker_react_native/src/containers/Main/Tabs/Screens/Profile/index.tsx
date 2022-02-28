import type { FC } from 'react';
import { PlusIcon } from 'components';
import useConnect from './connect';
import {
  Calendar,
  Card,
  Container,
  Detail,
  Divider,
  Header,
  Information,
  LogOutButton,
  Subtitle,
  Text,
  Title,
  Workers,
} from './styles';
import type { Props } from './types';

const Profile: FC<Props> = () => {
  const { handleToWorkersList, handleToAboutUs } = useConnect();
  return (
    <>
      <Container>
        <Header>
          <Title>Full name</Title>
          <Subtitle>Boss: </Subtitle>
          <LogOutButton>
            <PlusIcon />
          </LogOutButton>
        </Header>
        <Workers onPress={handleToWorkersList}>
          <Text>
            <PlusIcon /> Workers List
          </Text>
          <PlusIcon />
        </Workers>
        <Information>My schedule</Information>
        <Calendar />
        <Information>Information</Information>
        <Card onPress={handleToAboutUs}>
          <Detail>
            <PlusIcon /> About us
          </Detail>
          <PlusIcon />
        </Card>
        <Divider />
        <Card>
          <Detail>
            <PlusIcon /> Terms and conditions
          </Detail>
          <PlusIcon />
        </Card>
        {/* <InformationCard></InformationCard> */}
      </Container>
    </>
  );
};

export default Profile;
