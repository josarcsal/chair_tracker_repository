import type { FC } from 'react';
import { memo } from 'react';
import Icon from './Icon';
import useLogic from './logic';
import { Content, Container, Label } from './styles';
import type { Props } from './types';

const TabBarBottomItem: FC<Props> = ({ jumpTo, isFocused, routeName }) => {
  const { title, onPress } = useLogic({ jumpTo, routeName });

  return (
    <Container>
      <Content onPress={onPress}>
        <Icon icon={routeName} focused={isFocused} />
        <Label focused={isFocused}>{title}</Label>
      </Content>
    </Container>
  );
};

export default memo(TabBarBottomItem);
