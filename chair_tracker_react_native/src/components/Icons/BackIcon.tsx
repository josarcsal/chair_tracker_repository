import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import theme from 'theme';
import type { Props } from './types';

const BackIcon: FC<Props> = ({
  size = 25,
  color = theme.colors.cultured,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M15.535 3.515L7.05 12l8.485 8.485 1.415-1.414L9.878 12l7.072-7.071-1.415-1.414z"
      fill={color}
    />
  </Svg>
);

export default memo(BackIcon);
