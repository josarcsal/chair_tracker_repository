import styled from 'styled-components/native';
import { Calendar } from 'react-native-calendars';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 105,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.deepOcean};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.beforeBlue};
  height: 180px;
  padding: 55px 16px;
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  letter-spacing: 0.41px;
  color: ${({ theme }) => theme.colors.cultured};
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: 400;
  line-height: 41px;
  letter-spacing: 0.41px;
  color: ${({ theme }) => theme.colors.cultured};
`;

export const LogOutButton = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  right: 16px;
`;

export const Workers = styled.TouchableOpacity`
  height: 60px;
  width: ${({ theme }) => theme.device.width * 0.8}px;
  background-color: ${({ theme }) => theme.colors.marineBlue};
  border: 1px solid ${({ theme }) => theme.colors.marineBlue};
  box-sizing: border-box;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
  align-items: center;
  align-self: center;
  margin-top: -30px;
  margin-bottom: 20px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 22px;
  font-weight: 500;
  line-height: 41px;
  letter-spacing: 0.41px;
  margin-left: 10px;
`;

export const Information = styled.Text`
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 20px;
  font-weight: 600;
  line-height: 41px;
  letter-spacing: 0.41px;
  margin: 0px 16px;
`;

export const CalendarItem = styled(Calendar).attrs({
  hideExtraDays: true,
  disableMonthChange: true,
  firstDay: 1,
  disableAllTouchEventsForDisabledDays: true,
  enableSwipeMonths: true,
})`
  align-self: center;
  width: ${({ theme }) => theme.device.width * 0.9}px;
  padding-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.marineBlue};
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const Card = styled.TouchableOpacity`
  width: ${({ theme }) => theme.device.width * 0.91}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

export const Detail = styled.Text`
  color: ${({ theme }) => theme.colors.cultured};
  font-size: 17px;
  line-height: 41px;
  letter-spacing: 0.41px;
  font-weight: 300;
  margin-left: 15px;
`;

export const Divider = styled.View`
  height: 1px;
  width: ${({ theme }) => theme.device.width * 0.91}px;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.cultured};
  opacity: 0.4;
`;

export const InfoView = styled.View`
  flex-direction: row;
  align-items: center;
`;
