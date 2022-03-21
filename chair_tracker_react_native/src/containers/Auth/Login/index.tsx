import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import useConnect from './connect';
import { Container, Content, Subtitle, Title } from './styles';
import type { Props } from './types';

const Login: FC<Props> = () => {
  const { handleGoBack } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <Content>
        <Title>Welcome back!</Title>
        <Subtitle>Please, sign in to continue</Subtitle>
      </Content>
      <MainButton text={'Sign in'} />
      <SecondaryButton text={'Forgot pasword?'} />
    </Container>
  );
};

export default Login;
