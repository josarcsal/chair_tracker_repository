import type { StyleProp, ViewStyle } from 'react-native';

export type Props = {
  text: string;
  handlePress?: () => void;
  style?: StyleProp<ViewStyle>;
};
