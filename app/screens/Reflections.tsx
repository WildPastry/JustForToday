/* eslint-disable */
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import { MonoText } from '../components/StyledText';
import MonthItem from '../components/MonthItem';
import { IDayItems, IMonthItems } from '../types/date.types';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../redux/hooks';
import DayItem from '../components/DayItem';

const Reflections: React.FC = (): JSX.Element => {
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

  const getAllMonths = (): void => {
    setMonths(monthItems);
    setDays([]);
  };

  const getPrevMonth = (): void => {};

  const getNextMonth = (): void => {};

  const handleMonthClick = (month: IMonthItems): void => {
    setMonths([month]);
    setDays(month.days);
    console.log(month);
    console.log(month.days);
  };

  const handleDayClick = (day: IDayItems): void => {
    setDays([day]);
    console.log(day);
  };

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Reflections</MonoText>

      <Pressable onPress={() => getPrevMonth()}>
        <Text>PREV</Text>
      </Pressable>
      <Pressable onPress={() => getAllMonths()}>
        <Text>All</Text>
      </Pressable>
      <Pressable onPress={() => getNextMonth()}>
        <Text>NEXT</Text>
      </Pressable>

      {months.map((month, index) => (
        <MonthItem
          key={index}
          id={month.id}
          name={month.name}
          days={month.days}
          onPress={() => handleMonthClick(month)}
        />
      ))}
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

export default Reflections;
