/* eslint-disable */
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import { MonoText } from '../components/StyledText';
import MonthItem from '../components/MonthItem';
import { IMonthItems } from '../types/date.types';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { useAppSelector } from '../redux/hooks';

const Reflections: React.FC = (): JSX.Element => {
  // App selector for month data
  const monthItems = useAppSelector((state: AppState): IMonthItems[] => {
    return state.data.monthItems;
  });

  // Data local state
  const [months, setMonths] = useState<IMonthItems[]>([]);

  // Effect for setting the month items
  useEffect(() => {
    setMonths(monthItems);
  }, [monthItems]);

  const handleClick = (month: IMonthItems): void => {
    console.log(month);
  };

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Reflections</MonoText>
      {months.map((month, index) => (
        <MonthItem
          key={index}
          id={month.id}
          name={month.name}
          days={month.days}
          onPress={() => handleClick(month)}
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
