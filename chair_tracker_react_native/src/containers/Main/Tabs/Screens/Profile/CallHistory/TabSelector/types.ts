import type { MutableRefObject } from 'react';
import type PagerView from 'react-native-pager-view';

export type Props = {
  refPagerView: MutableRefObject<PagerView | null>;
  currentPage: number;
};

export type ButtonProps = {
  disabled: boolean;
};
