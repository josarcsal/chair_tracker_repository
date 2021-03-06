import type { FC } from 'react';
import { memo } from 'react';
import BackIcon from 'components/Icons/BackIcon';
import { BackButton, BackText, Container } from './styles';

import type { Props } from './types';

const DetailHeader: FC<Props> = ({ onPressBack }) => (
  <Container>
    <BackButton onPress={onPressBack}>
      <BackIcon />
      <BackText>Back</BackText>
    </BackButton>
  </Container>
);

export default memo(DetailHeader);
