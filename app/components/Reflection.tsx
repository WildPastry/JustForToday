/* eslint-disable */
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import { IDailyReflections } from '../types/data.types';
import add from 'date-fns/add';
import { getCurrentDay } from '../redux/slices/dateSlice';
import { useAppSelector } from '../redux/hooks';

const Reflection: React.FC = (): JSX.Element => {
  // Selectors for store
  const dailyReflections = useAppSelector(
    (state: AppState): IDailyReflections[] => {
      return state.data.dailyReflections;
    }
  );

  const currentDay = useAppSelector((state: AppState): string => {
    return state.date.currentDay;
  });

  // Data local state
  const [reflection, setReflection] = useState<IDailyReflections>({
    id: '',
    date: '',
    title: '',
    quote: '',
    source: '',
    dailyReflection: ''
  });

  // Date local state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Effect for setting the current reflection based on date
  useEffect(() => {
    selectReflection(currentDay, dailyReflections);
  }, [dailyReflections]);

  const getPrevDay = (): string => {
    // Calculate prev day
    const prevDate = add(currentDate, { days: -1 });
    const month: string = prevDate.toLocaleString('default', {
      month: 'short'
    });
    const day: string = prevDate.getDate().toString();
    // Update currentDate
    setCurrentDate(prevDate);
    // Use prev day and month as ID
    const prevDay: string = month + day;
    return prevDay;
  };

  const getNextDay = (): string => {
    // Calculate next day
    const nextDate = add(currentDate, { days: 1 });
    const month: string = nextDate.toLocaleString('default', {
      month: 'short'
    });
    const day: string = nextDate.getDate().toString();
    // Update currentDate
    setCurrentDate(nextDate);
    // Use next day and month as ID
    const nextDay: string = month + day;
    return nextDay;
  };

  // Select the reflection from the data
  const selectReflection = (
    id: string,
    dailyReflections: IDailyReflections[]
  ): void => {
    const currentReflection = dailyReflections.find((dailyReflection) => {
      return dailyReflection.id === id;
    });
    // If a matching reflection is found - set with matched data
    if (currentReflection) {
      setReflection({
        id: currentReflection.id,
        date: currentReflection.date,
        title: currentReflection.title,
        quote: currentReflection.quote,
        source: currentReflection.source,
        dailyReflection: currentReflection.dailyReflection
      });
      // Set a blank reflection otherwise
    } else {
      setReflection({
        id: '',
        date: currentDate.toLocaleString(),
        title: 'No data available',
        quote: '',
        source: '',
        dailyReflection: ''
      });
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => selectReflection(getPrevDay(), dailyReflections)}>
        <Text>PREV</Text>
      </Pressable>
      <Pressable
        onPress={() => selectReflection(getCurrentDay(), dailyReflections)}>
        <Text>TODAY</Text>
      </Pressable>
      <Pressable
        onPress={() => selectReflection(getNextDay(), dailyReflections)}>
        <Text>NEXT</Text>
      </Pressable>
      <Text style={styles.text}>{reflection.date}</Text>
      <Text style={styles.text}>{reflection.title}</Text>
      <Text style={styles.text}>{reflection.quote}</Text>
      <Text style={styles.text}>{reflection.dailyReflection}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
});

export default Reflection;
