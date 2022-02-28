import type { FC } from 'react';
import { memo } from 'react';
import { Subtitle, Container, Title } from './styles';
import type { Props } from './types';

const MainHeader: FC<Props> = ({ title, subtitle }) => (
  <Container>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Container>
);

export default memo(MainHeader);
