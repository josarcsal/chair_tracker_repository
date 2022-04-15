import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import theme from 'theme';
import type { Props } from './types';

const CallIcon: FC<Props> = ({
  size = 70,
  color = theme.colors.cultured,
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M8.742 8.682c-1.073.912-1.466 2.575-.54 3.909a12.818 12.818 0 003.208 3.207c1.334.926 2.997.533 3.909-.54l.01.005c1.164.54 2.401.909 3.671 1.097V19h-.004C11.022 19.011 4.991 12.911 5 5.004V5h2.64v.001c.188 1.27.558 2.506 1.097 3.67l.005.01zM19 21H20a1 1 0 001-1v-4.502a1 1 0 00-.853-.99l-.854-.126a11.416 11.416 0 01-3.123-.934l-.753-.349a1 1 0 00-1.234.326l-.341.477c-.299.419-.87.546-1.291.253a10.819 10.819 0 01-2.706-2.705c-.293-.422-.165-.993.253-1.291l.477-.34a1 1 0 00.326-1.235l-.35-.754c-.458-.99-.773-2.042-.933-3.123l-.127-.854A1 1 0 008.501 3H4a1 1 0 00-1 1v1.001C2.99 14.008 9.91 21.013 18.999 21z"
      fill={color}
    />
  </Svg>
);

export default memo(CallIcon);
