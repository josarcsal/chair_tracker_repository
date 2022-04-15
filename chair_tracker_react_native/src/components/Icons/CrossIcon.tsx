import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import theme from 'theme';
import type { Props } from './types';

const CrossIcon: FC<Props> = ({
  size = 20,
  color = theme.colors.cultured,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.59 5L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41 17.59 5z"
      fill={color}
    />
  </Svg>
);

export default memo(CrossIcon);
