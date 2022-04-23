import { useSafeAreaInsets as useSA } from 'react-native-safe-area-context';

const useSafeAreaInsets = () => {
  const {
    bottom: safeBottom,
    left: safeLeft,
    right: safeRight,
    top: safeTop,
  } = useSA();

  return { safeBottom, safeLeft, safeRight, safeTop };
};

export default useSafeAreaInsets;
