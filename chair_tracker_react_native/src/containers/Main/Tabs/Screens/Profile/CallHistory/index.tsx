import type { FC } from 'react';
import { useRef } from 'react';
import type PagerView from 'react-native-pager-view';
import DetailHeader from 'components/Header/DetailHeader';
import useSafeAreaInsets from 'utils/hooks/useSafeAreaInserts';
import useConnect from './connect';
import List from './List';
import { Container, Page, Pager } from './styles';
import TabSelector from './TabSelector';

import type { Props } from './types';

const CallHistory: FC<Props> = () => {
  const { safeTop } = useSafeAreaInsets();
  const {
    finalDataIncoming,
    finalDataOutgoing,
    handleGoBack,
    onPageScroll,
    currentPage,
    readValue,
  } = useConnect();
  const pagerRef = useRef<PagerView | null>(null);
  readValue();
  return (
    <Container safeTop={safeTop}>
      <DetailHeader onPressBack={handleGoBack} />
      <TabSelector refPagerView={pagerRef} currentPage={currentPage} />
      <Pager
        initialPage={0}
        ref={pagerRef}
        onPageScroll={onPageScroll}
        scrollEnabled
      >
        <Page key="1" collapsable={false}>
          <List data={finalDataIncoming} />
        </Page>
        <Page key="2" collapsable={false}>
          <List data={finalDataOutgoing} />
        </Page>
      </Pager>
    </Container>
  );
};

export default CallHistory;
