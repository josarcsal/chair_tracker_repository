import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { Props } from './types';

const AlarmClockIcon: FC<Props> = ({
  size = 25,
  color = '#F5F5F5',
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M11.999 22a9.121 9.121 0 01-9-9 9.121 9.121 0 019-9 9.121 9.121 0 019 9 9.121 9.121 0 01-9 9zm0-16a7.094 7.094 0 00-7 7 7.094 7.094 0 007 7 7.094 7.094 0 007-7 7.094 7.094 0 00-7-7zm5 8h-6V8h2v4h4v2zm3.292-7.292l-3.009-3 1.409-1.417 3.01 3-1.41 1.416v.001zm-16.585 0L2.291 5.291l2.991-3 1.415 1.417-2.989 3h-.002z"
      fill={color}
    />
  </Svg>
);

export default memo(AlarmClockIcon);
