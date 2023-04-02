/* eslint-disable */
import { AppState } from '../redux/store';
import { DailyReflection } from '../types/data.types';
import { Pressable, StyleSheet, View } from 'react-native';
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
    id: '',
    date: '',
    title: '',
    quote: '',
    source: '',
    reflection: ''
  });

  // Select the daily reflection with useEffect
  useEffect(() => {
    selectReflection(getCurrentDay(), dailyReflections);
  }, []);

  const getCurrentDay = (): string => {
    // Calculate current day and month
    const date: Date = new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const currentDay: string = month + day;
    return currentDay;
  };

  const selectReflection = (
    id: string,
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
        id: '',
        date: 'No data available',
        title: '',
        quote: '',
        source: '',
        reflection: ''
      });
    }
  };

  return (
    <View>
      <Pressable onPress={() => selectReflection('Jan1', dailyReflections)}>
        <Text>PREV</Text>
      </Pressable>
      <Pressable
        onPress={() => selectReflection(getCurrentDay(), dailyReflections)}>
        <Text>TODAY</Text>
      </Pressable>
      <Pressable onPress={() => selectReflection('Jan2', dailyReflections)}>
        <Text>NEXT</Text>
      </Pressable>
      <Text style={styles.text}>{reflection.date}</Text>
      <Text style={styles.text}>{reflection.title}</Text>
      <Text style={styles.text}>{reflection.quote}</Text>
      <Text style={styles.text}>{reflection.reflection}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
});

export default Reflection;
