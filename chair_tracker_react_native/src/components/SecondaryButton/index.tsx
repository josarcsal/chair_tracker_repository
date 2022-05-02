import type { FC } from 'react';
import React, { memo } from 'react';
import { SignUpButton, SignUpText } from './styles';
import type { Props } from './types';

const SecondaryButton: FC<Props> = ({ text, handlePress, style }) => (
  <SignUpButton onPress={handlePress} style={style}>
    <SignUpText>{text}</SignUpText>
  </SignUpButton>
);

export default memo(SecondaryButton);
