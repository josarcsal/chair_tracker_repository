import type { FC } from 'react';
import { memo } from 'react';
import { PlusIcon } from 'components/Icons';
import RefreshIcon from 'components/Icons/RefreshIcon';
import {
  Subtitle,
  Container,
  Title,
  UtilsView,
  RefreshButton,
  AddButton,
  IconsView,
} from './styles';
import type { Props } from './types';

const MainHeader: FC<Props> = ({ title, subtitle, handleAdd, refetch }) => (
  <Container>
    <UtilsView>
      <Title>{title}</Title>
      <IconsView>
        {refetch && (
          <RefreshButton onPress={() => refetch()}>
            <RefreshIcon size={27} />
          </RefreshButton>
        )}
        {handleAdd && (
          <AddButton onPress={handleAdd}>
            <PlusIcon />
          </AddButton>
        )}
      </IconsView>
    </UtilsView>
    <Subtitle>{subtitle}</Subtitle>
  </Container>
);

export default memo(MainHeader);
