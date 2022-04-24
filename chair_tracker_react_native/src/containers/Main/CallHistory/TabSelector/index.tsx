import type { FC } from 'react';
import { Container, Main, ButtonContainer, Title } from './styles';
import type { Props } from './types';

const TabSelector: FC<Props> = ({ refPagerView, currentPage }) => {
  const buttonRealizadas = currentPage !== 0;
  const buttonRecibidas = currentPage !== 1;
  const handleRealizadas = () => refPagerView?.current?.setPage(0);
  const handleRecibidas = () => refPagerView?.current?.setPage(1);

  return (
    <Container>
      <ButtonContainer onPress={handleRealizadas}>
        <Main disabled={buttonRealizadas}>
          <Title>Outgoing calls</Title>
        </Main>
      </ButtonContainer>
      <ButtonContainer onPress={handleRecibidas}>
        <Main disabled={buttonRecibidas}>
          <Title>Incoming calls</Title>
        </Main>
      </ButtonContainer>
    </Container>
  );
};

export default TabSelector;
