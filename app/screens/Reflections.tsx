/* eslint-disable */
import { useEffect, useState } from 'react';
import { MonthNames, MonthItems } from '../types/date.types';
import { MonoText } from '../components/StyledText';
import MonthItem from '../components/MonthItem';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

const Reflections: React.FC = (): JSX.Element => {
  // Data local state
  const [months, setMonths] = useState<MonthItems[]>([]);

  useEffect(() => {
    // months.map((month, index) => console.log('month', month, index));
    const monthItems: MonthItems[] = []
   
  }, []);

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Reflections</MonoText>

      {months.map((month, index) => (
        <MonthItem
          key={index}
          id={month.id}
          name={month.name}
          days={month.days}
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
