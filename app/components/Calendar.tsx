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
  // Component settings
  const [months, setMonths] = useState<IMonthItem[]>([]);
  const [days, setDays] = useState<IDayItem[]>([]);

  // Data from store
  const monthItems: IMonthItem[] = useAppSelector(
    (state: AppState): IMonthItem[] => {
      return state.data.monthItems;
    }
  );

  useEffect(() => {
    setMonths(monthItems);
  }, [monthItems]);

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
        <Text style={[styles.text, styles.bold]}>ALL MONTHS</Text>
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
    // alignItems: 'center',
    // flex: 1,
    // justifyContent: 'center'
  },
  text: {
    marginBottom: 10,
    textAlign: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default Calendar;
