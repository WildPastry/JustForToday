import { IDate, IDateFormat } from '../types/date.types';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { setCurrentDate, setCurrentDay } from '../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import { IDailyReflection } from '../types/data.types';
import add from 'date-fns/add';
import format from 'date-fns/format';

const Reflection: React.FC = (): JSX.Element => {
  // Selectors for store
  const dailyReflections = useAppSelector(
    (state: AppState): IDailyReflection[] => {
      return state.data.dailyReflections;
    }
  );

  const dates = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // Dispatch settings
  const dispatch = useAppDispatch();

  // Data local state
  const [reflection, setReflection] = useState<IDailyReflection>({
    id: '',
    date: '',
    title: '',
    quote: '',
    source: '',
    dailyReflection: ''
  });

  // Effect for setting the current reflection based on date
  useEffect(() => {
    selectReflection(dates.currentDay, dailyReflections);
  }, [dailyReflections]);

  const getCurrentDay = (): string => {
    // Calculate current day
    const currentDay = format(new Date(), IDateFormat.ddMM);
    // Update store
    dispatch(setCurrentDate(Date.now()));
    dispatch(setCurrentDay(currentDay));
    return currentDay;
  };

  const getPrevDay = (): string => {
    // Calculate previous day
    const currentDate = new Date(dates.currentDate);
    const prevDate = add(currentDate, { days: -1 });
    const prevDay = format(prevDate, IDateFormat.ddMM);
    // Update store
    dispatch(setCurrentDate(prevDate.getTime()));
    dispatch(setCurrentDay(prevDay));
    return prevDay;
  };

  const getNextDay = (): string => {
    // Calculate next day
    const currentDate = new Date(dates.currentDate);
    const nextDate = add(currentDate, { days: 1 });
    const nextDay = format(nextDate, IDateFormat.ddMM);
    // Update store
    dispatch(setCurrentDate(nextDate.getTime()));
    dispatch(setCurrentDay(nextDay));
    return nextDay;
  };

  // Select the reflection from the data
  const selectReflection = (
    id: string,
    dailyReflections: IDailyReflection[]
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
        date: '',
        title: 'No data available',
        quote: '',
        source: '',
        dailyReflection: ''
      });
    }
  };

  return (
    <View>
      {/* Controls */}
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
      {/* Reflection */}
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
