import { ICalendar, IDayItem, IMonthItem } from '../types/date.types';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView, Text, View } from '../components/Themed';
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
  const monthItems: IMonthItem[] = useAppSelector(
    (state: AppState): IMonthItem[] => {
      return state.data.monthItems;
    }
  );

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

  const handleMonth = (month: IMonthItem): void => {
    setMonths([month]);
    setDays(month.days);
  };

  const handleDay = (day: IDayItem): void => {
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
      <ScrollView>
        {/* Months */}
        {months.map((month, index) => (
          <MonthItem
            key={index}
            id={month.id}
            name={month.name}
            days={month.days}
            onPress={() => handleMonth(month)}
          />
        ))}
        {/* Days */}
        {days.map((day, index) => (
          <DayItem
            key={index}
            id={day.id}
            name={day.name}
            onPress={() => handleDay(day)}
          />
        ))}
      </ScrollView>
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
