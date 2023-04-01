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
    selectReflection(selectDay(), dailyReflections);
  }, []);

  const selectDay = (): number => {
    return 1
  }

  const selectReflection = (
    id: number,
    dailyReflections: DailyReflection[]
  ): string => {
    const currentReflection = dailyReflections.find((dailyReflection) => {
      return dailyReflection.id === id;
    });

    console.log(currentReflection);

    if (currentReflection) {
      setReflection({
        id: currentReflection.id,
        date: currentReflection.date,
        title: currentReflection.title,
        quote: currentReflection.quote,
        source: currentReflection.source,
        reflection: currentReflection.reflection
      });
    }

    return 'currentReflection';
  };

  return <Text style={styles.text}>{reflection.id}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
});

export default Reflection;
