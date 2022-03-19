import type { FlatList } from 'react-native';
import styled from 'styled-components/native';
import type { Alarma } from 'axios/types/alarma';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fdWhite};
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  top: 65px;
  right: 20px;
`;

export const AlarmList = styled.FlatList.attrs<Alarma>({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 70,
    paddingLeft: 8,
    paddingRight: 8,
  },
})`` as unknown as typeof FlatList;
