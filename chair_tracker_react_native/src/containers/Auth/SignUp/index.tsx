import type { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DetailHeader from 'components/Header/DetailHeader';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import useConnect from './connect';
import { Container, Content, Title } from './styles';
import type { Props } from './types';

const SignUp: FC<Props> = () => {
  const { handleGoBack } = useConnect();
  const { top: safeTop } = useSafeAreaInsets();

  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <Content>
        <Title>Welcome!</Title>
      </Content>

      <MainButton text={'Create your account'} />
      <SecondaryButton
        text={'By creating an account, you agree to our Terms'}
      />
      <SecondaryButton text={'Already have an account? Sign in'} />
    </Container>
  );
};

export default SignUp;
