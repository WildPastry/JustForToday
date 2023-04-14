import { ICalendar, IDayItem, IMonthItem } from '../types/date.types';
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
  const monthItems = useAppSelector((state: AppState): IMonthItem[] => {
    return state.data.monthItems;
  });

  // Local data
  const [months, setMonths] = useState<IMonthItem[]>([]);
  const [days, setDays] = useState<IDayItem[]>([]);

  // Effect for setting the month items
  useEffect(() => {
    setMonths(monthItems);
  }, [monthItems]);

  // Reset to all months
  const getAllMonths = (): void => {
    setMonths(monthItems);
    setDays([]);
  };

  // Handling click functions
  const handleMonthClick = (month: IMonthItem): void => {
    setMonths([month]);
    setDays(month.days);
  };

  const handleDayClick = (day: IDayItem): void => {
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20
  }
});

export default Calendar;
