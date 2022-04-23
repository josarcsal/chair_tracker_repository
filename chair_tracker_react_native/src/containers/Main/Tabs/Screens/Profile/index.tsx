import type { FC } from 'react';
import CallIcon from 'components/Icons/CallIcon';
import InfoIcon from 'components/Icons/InfoIcon';
import LogoutIcon from 'components/Icons/LogoutIcon';
import NextIcon from 'components/Icons/NextIcon';
import QuestionIcon from 'components/Icons/QuestionIcon';
import useConnect from './connect';
import {
  Calendar,
  Card,
  Container,
  Detail,
  Divider,
  Header,
  Information,
  InfoView,
  LogOutButton,
  Subtitle,
  Text,
  Title,
  Calls,
} from './styles';
import type { Props } from './types';

const Profile: FC<Props> = () => {
  const { handleToCallHistory, handleToAboutUs } = useConnect();
  return (
    <>
      <Container>
        <Header>
          <Title>Full name</Title>
          <Subtitle>Boss: </Subtitle>
          <LogOutButton>
            <LogoutIcon />
          </LogOutButton>
        </Header>
        <Calls onPress={handleToCallHistory}>
          <InfoView>
            <CallIcon size={30} />
            <Text>Call history</Text>
          </InfoView>
          <NextIcon size={27} />
        </Calls>
        <Information>My schedule</Information>
        <Calendar />
        <Information>Information</Information>
        <Card onPress={handleToAboutUs}>
          <InfoView>
            <InfoIcon />
            <Detail>About us</Detail>
          </InfoView>
          <NextIcon />
        </Card>
        <Divider />
        <Card>
          <InfoView>
            <QuestionIcon />
            <Detail>Terms and conditions</Detail>
          </InfoView>
          <NextIcon />
        </Card>
      </Container>
    </>
  );
};

export default Profile;
