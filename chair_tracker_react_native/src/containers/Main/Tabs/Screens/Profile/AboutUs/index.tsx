import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainHeader from 'components/Header/MainHeader';
import useConnect from './connect';
import { Container, Content } from './styles';
import type { Props } from './types';

const AboutUs: FC<Props> = () => {
  const { handleGoBack } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <MainHeader title="Chair Tracker" />
      <Content>
        {' '}
        The aim of this project is to present a complete system, combining
        software and hardware, that offers the user a device with embedded
        sensors and actuators, together with a mobile app (available at Android
        and iOS). In this manner, we enable the user to use several features
        related to postural hygiene.
      </Content>
      <Content>
        {' '}
        Thanks to the app, the user will have the option to check stats about
        their sitting time as well as stablishing work cycles, where the user
        would still be sitting, and rest cycles, where the user would need to
        get up from the chair. Integrating all of these features on the app with
        the physical device, will make sure that the user meets these cycles in
        order to ensure his health.
      </Content>
      <Content>
        {' '}
        Not only these features are offered but also, we provide the users with
        proper tools to maintain their comfort and concentration during working
        cycles since they would be able to keep in touch with other users
        without being interrupted due to the notification system that uses
        vibrating alarms in the physical device.
      </Content>
      <Content>
        {' '}
        During this project many technologies have been use in the development
        of this app such as MySQL, Vert.x, ESP8266 and React Native, just to
        name a few. Resulting in final product almost ready to be placed on the
        market.
      </Content>
    </Container>
  );
};

export default AboutUs;
