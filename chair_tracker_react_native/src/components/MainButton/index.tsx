import type { FC } from 'react';
import React, { memo } from 'react';
import { SignInButton, SignInText } from './styles';
import type { Props } from './types';

const SecondaryButton: FC<Props> = ({ text, handlePress }) => (
  <SignInButton onPress={handlePress}>
    <SignInText>{text}</SignInText>
  </SignInButton>
);

export default memo(SecondaryButton);
