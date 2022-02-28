import type { FC } from 'react';
import { Container, Text } from './styles';
import type { Props } from './types';

const Welcome: FC<Props> = () => (
  <Container>
    <Text>Welcome screen</Text>
  </Container>
);

export default Welcome;
