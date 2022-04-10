import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import theme from 'theme';
import type { Props } from './types';

const LogoutIcon: FC<Props> = ({
  size = 30,
  color = theme.colors.cultured,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M19 21h-9a2 2 0 01-2-2v-4h2v4h9V5h-9v4H8V5a2 2 0 012-2h9a2 2 0 012 2v14a2 2 0 01-2 2zm-7-5v-3H3v-2h9V8l5 4-5 4z"
      fill={color}
    />
  </Svg>
);

export default memo(LogoutIcon);
