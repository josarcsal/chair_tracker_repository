import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { Props } from './types';

const AvatarIcon: FC<Props> = ({ size = 25, color = 'black', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M7 8a5 5 0 1110 0A5 5 0 017 8zm5 3a3 3 0 100-6 3 3 0 000 6zM6.343 16.343A8 8 0 004 22h2a6 6 0 1112 0h2a8 8 0 00-13.657-5.657z"
      fill={color}
    />
  </Svg>
);

export default memo(AvatarIcon);
