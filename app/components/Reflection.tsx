/* eslint-disable */
import { AppState } from '../redux/store';
import { DailyReflection } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from '../components/Themed';
import { useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';

const Reflection: React.FC = (): JSX.Element => {
  // App selector for app data
  const dailyReflections = useAppSelector(
    (state: AppState): DailyReflection[] => {
      return state.data.dailyReflections;
    }
  );

  // Default local state
  const [reflection, setReflection] = useState<DailyReflection>({
    id: 0,
    date: '',
    title: '',
    quote: '',
    source: '',
    reflection: ''
  });

  // Select the daily reflection with useEffect
  useEffect(() => {
    selectReflection(selectDayMonth(), dailyReflections);
  }, []);

  const selectDayMonth = (): number => {
    // Calculate current day and month
    const date: Date = new Date(),month = date.getMonth() + 1,day = date.getDate();
    const currentDayMonth: number = Number('' + day + month);
    console.log(currentDayMonth);
    return currentDayMonth;
  };

  const selectReflection = (
    id: number,
    dailyReflections: DailyReflection[]
  ): void => {
    const currentReflection = dailyReflections.find((dailyReflection) => {
      return dailyReflection.id === id;
    });

    if (currentReflection) {
      setReflection({
        id: currentReflection.id,
        date: currentReflection.date,
        title: currentReflection.title,
        quote: currentReflection.quote,
        source: currentReflection.source,
        reflection: currentReflection.reflection
      });
    } else {
      setReflection({
        id: 0,
        date: 'No data available',
        title: 'No data available',
        quote: 'No data available',
        source: 'No data available',
        reflection: 'No data available'
      });
    }
  };

  return <Text style={styles.text}>{reflection.date}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
});

export default Reflection;
