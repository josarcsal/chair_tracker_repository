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
      d="M11.995 4.00001C7.83622 3.99432 4.36666 7.17599 4.01301 11.3197C3.65936 15.4634 6.53957 19.187 10.6392 19.8862C14.7388 20.5853 18.6903 18.0267 19.73 14H17.649C16.6318 16.8771 13.617 18.5324 10.6435 17.8465C7.66991 17.1605 5.6849 14.3519 6.03081 11.3199C6.37672 8.28792 8.94335 5.99856 11.995 6.00001C13.5845 6.00234 15.1064 6.64379 16.218 7.78002L13 11H20V4.00001L17.649 6.35002C16.1527 4.84464 14.1175 3.99873 11.995 4.00001Z"
      fill={color}
    />
  </Svg>
);

export default memo(AlarmClockIcon);
