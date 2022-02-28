import type { FC } from 'react';
import { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { Props } from './types';

const PlusIcon: FC<Props> = ({ size = 20, color = '#4E4D93', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 .833C11 .373 10.552 0 10 0S9 .373 9 .833V9H.833C.373 9 0 9.448 0 10s.373 1 .833 1H9v8.167c0 .46.448.833 1 .833s1-.373 1-.833V11h8.167c.46 0 .833-.448.833-1s-.373-1-.833-1H11V.833z"
      fill={color}
    />
  </Svg>
);

export default memo(PlusIcon);
