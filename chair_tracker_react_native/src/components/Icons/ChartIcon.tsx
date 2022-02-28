import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { Props } from './types';

const ChartIcon: FC<Props> = ({ size = 25, color = 'black', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M22 21H2V11a2 2 0 012-2h4V4a2 2 0 012-2h4a2 2 0 012 2v3h4a2 2 0 012 2v12zM16 9v10h4V9h-4zm-6-5v15h4V4h-4zm-6 7v8h4v-8H4z"
      fill={color}
    />
  </Svg>
);

export default memo(ChartIcon);
