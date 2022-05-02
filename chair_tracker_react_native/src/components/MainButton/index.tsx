import type { FC } from 'react';
import React, { memo } from 'react';
import { SignInButton, SignInText } from './styles';
import type { Props } from './types';

const MainButton: FC<Props> = ({ text, handlePress, style }) => (
  <SignInButton onPress={handlePress} style={style}>
    <SignInText>{text}</SignInText>
  </SignInButton>
);

export default memo(MainButton);
