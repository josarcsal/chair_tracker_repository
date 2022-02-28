import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fdWhite};
`;

export const AddButton = styled.TouchableOpacity`
  margin-right: 6px;
  position: absolute;
  top: 65px;
  right: 22px;
`;

export const StadisticList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    alignItems: 'center',
  },
})``;
