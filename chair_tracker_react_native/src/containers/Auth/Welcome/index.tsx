import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LOGO } from 'assets/images';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import useConnect from './connect';
import {
  Background,
  Container,
  ImageContainer,
  SubContainer,
  Subtitle,
  Title,
} from './styles';
import type { Props } from './types';

const Welcome: FC<Props> = () => {
  const { handleToLogin, handleToSignUp } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container safeTop={safeTop}>
      <ImageContainer>
        <Background source={LOGO} />
      </ImageContainer>

      <SubContainer>
        <Title>Welcome</Title>
        <Subtitle>
          This is Chair Tracker App. Please log in and start tracking your work
        </Subtitle>
        <MainButton text={'Sign in'} handlePress={handleToLogin} />
        <SecondaryButton
          text={'Don´t have an account? Sign up here'}
          handlePress={handleToSignUp}
        />
      </SubContainer>
    </Container>
  );
};

export default Welcome;
