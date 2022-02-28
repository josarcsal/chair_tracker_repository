import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { Props } from './types';

const NextIcon: FC<Props> = ({ size = 20, color = 'black', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M8.465 20.485L16.95 12 8.465 3.515 7.05 4.929 14.122 12 7.05 19.071l1.415 1.414z"
      fill={color}
    />
  </Svg>
);

export default memo(NextIcon);
