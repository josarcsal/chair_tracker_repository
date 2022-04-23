import type { StyleProp, ViewStyle } from 'react-native';

export type Props = {
  data: string[];
};

export type CardItemProps = {
  id: string;
  tagColor?: string;
  tagTitle?: string;
  title?: string;
  subtitle?: string;
  duration?: string;
  liked?: boolean;
  onPressLike?: (id: string) => void;
  onPressPlay?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

export type RenderItemProps = {
  index: number;
  item: CardItemProps;
};

export type ListProps = { safeBottom: number };
