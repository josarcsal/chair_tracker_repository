import type { FC } from 'react';
import GroupIcon from 'components/Icons/GroupIcon';
import InfoIcon from 'components/Icons/InfoIcon';
import LogoutIcon from 'components/Icons/LogoutIcon';
import NextIcon from 'components/Icons/NextIcon';
import QuestionIcon from 'components/Icons/QuestionIcon';
import useConnect from './connect';
import {
  CalendarItem,
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
            <LogoutIcon />
          </LogOutButton>
        </Header>
        <Workers onPress={handleToWorkersList}>
          <InfoView>
            <GroupIcon size={30} />
            <Text>Workers List</Text>
          </InfoView>
          <NextIcon size={27} />
        </Workers>
        <Information>My schedule</Information>

        <CalendarItem
          current={'2022-04-23'}
          minDate={'2022-01-01'}
          maxDate={'2022-12-31'}
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          monthFormat={'mm - yyyy'}
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
        />

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
