/* eslint-disable */
import { ICalendar, IDayItems, IMonthItems } from '../types/date.types';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import DayItem from '../components/DayItem';
import { MonoText } from '../components/StyledText';
import MonthItem from '../components/MonthItem';
import { useAppSelector } from '../redux/hooks';

const Calendar: React.FC<ICalendar> = ({
  handleCalendarChange
}: ICalendar): JSX.Element => {
  // App selector for month data
  const monthItems = useAppSelector((state: AppState): IMonthItems[] => {
    return state.data.monthItems;
  });

  // Data local states
  const [months, setMonths] = useState<IMonthItems[]>([]);
  const [days, setDays] = useState<IDayItems[]>([]);

  // Effect for setting the month items
  useEffect(() => {
    setMonths(monthItems);
  }, [monthItems]);

  // Reset to all months
  const getAllMonths = (): void => {
    setMonths(monthItems);
    setDays([]);
  };

  const handleMonthClick = (month: IMonthItems): void => {
    setMonths([month]);
    setDays(month.days);
  };

  const handleDayClick = (day: IDayItems): void => {
    setDays([day]);
    handleCalendarChange(false, day.id);
  };

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Calendar</MonoText>
      {/* Reset to all months */}
      <Pressable onPress={() => getAllMonths()}>
        <Text>ALL MONTHS</Text>
      </Pressable>
      {/* Months */}
      {months.map((month, index) => (
        <MonthItem
          key={index}
          id={month.id}
          name={month.name}
          days={month.days}
          onPress={() => handleMonthClick(month)}
        />
      ))}
      {/* Days */}
      {days.map((day, index) => (
        <DayItem
          key={index}
          id={day.id}
          name={day.name}
          onPress={() => handleDayClick(day)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20
  }
});

export default Calendar;
