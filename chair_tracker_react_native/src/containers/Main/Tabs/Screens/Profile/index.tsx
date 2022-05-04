import type { FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import CallIcon from 'components/Icons/CallIcon';
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
  Calls,
} from './styles';
import type { Props } from './types';

const Profile: FC<Props> = () => {
  const {
    handleToCallHistory,
    handleToAboutUs,
    readValue,
    nombre,
    nifJefe,
    handleToTermsAndConditions,
    handleToAlarmsDayModal,
  } = useConnect();
  readValue();
  return (
    <>
      <Container>
        <Header>
          <Title>{nombre}</Title>
          {nifJefe !== 'null' ? (
            <Subtitle>Worker</Subtitle>
          ) : (
            <Subtitle>Boss</Subtitle>
          )}
          <LogOutButton
            onPress={() => {
              AsyncStorage.setItem('logged', '0');
              RNRestart.Restart();
            }}
          >
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

        <CalendarItem
          current={new Date().toDateString()}
          monthFormat={'MMMM yyyy'}
          minDate={'2022-01-01'}
          maxDate={'2025-12-31'}
          onDayPress={handleToAlarmsDayModal}
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
        <Card onPress={handleToTermsAndConditions}>
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
