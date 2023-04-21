import { EDateFormat, IDate } from '../types/date.types';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { setCurrentDate, setCurrentDay } from '../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import { IReflection } from '../types/data.types';
import add from 'date-fns/add';
import format from 'date-fns/format';

const Reflection: React.FC = (): JSX.Element => {
  // Selectors for store
  const reflections: IReflection[] = useAppSelector(
    (state: AppState): IReflection[] => {
      return state.data.reflections;
    }
  );

  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // Dispatch settings
  const dispatch = useAppDispatch();

  // Data local state
  const [reflection, setReflection] = useState<IReflection>({
    id: '',
    date: '',
    title: '',
    quote: '',
    source: '',
    dailyReflection: ''
  });

  // Effect for setting the current reflection based on date
  useEffect(() => {
    selectReflection(dates.currentDay, reflections);
  }, [reflections]);

  const getCurrentDay = (): string => {
    // Calculate current day
    const currentDay = format(new Date(), EDateFormat.ddMM);
    // Update store
    dispatch(setCurrentDate(Date.now()));
    dispatch(setCurrentDay(currentDay));
    return currentDay;
  };

  const getPrevDay = (): string => {
    // Calculate previous day
    const currentDate = new Date(dates.currentDate);
    const prevDate = add(currentDate, { days: -1 });
    const prevDay = format(prevDate, EDateFormat.ddMM);
    // Update store
    dispatch(setCurrentDate(prevDate.getTime()));
    dispatch(setCurrentDay(prevDay));
    return prevDay;
  };

  const getNextDay = (): string => {
    // Calculate next day
    const currentDate = new Date(dates.currentDate);
    const nextDate = add(currentDate, { days: 1 });
    const nextDay = format(nextDate, EDateFormat.ddMM);
    // Update store
    dispatch(setCurrentDate(nextDate.getTime()));
    dispatch(setCurrentDay(nextDay));
    return nextDay;
  };

  // Select the reflection from the data
  const selectReflection = (
    id: string,
    reflections: IReflection[]
  ): void => {
    const currentReflection = reflections.find((dailyReflection) => {
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
        dailyReflection: verifyData(currentReflection.dailyReflection)
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

  // Verify if the data needs new lines inserted
  const verifyData = (data: string): string => {
    // Create pattern to find new line symbol {}
    const newLineSymbol = /\{(?<DATA>.*?)\}/gu;
    // Replace symbols with new lines
    const verifiedData = data.replace(newLineSymbol, '\n\n');
    return verifiedData;
  };

  return (
    <View>
      {/* Controls */}
      <Pressable
        onPress={() => selectReflection(getPrevDay(), reflections)}>
        <Text>PREV</Text>
      </Pressable>
      <Pressable
        onPress={() => selectReflection(getCurrentDay(), reflections)}>
        <Text>TODAY</Text>
      </Pressable>
      <Pressable
        onPress={() => selectReflection(getNextDay(), reflections)}>
        <Text>NEXT</Text>
      </Pressable>
      {/* Reflection */}
      <Text style={styles.title}>{reflection.date}</Text>
      <Text style={styles.title}>{reflection.title}</Text>
      <Text style={styles.text}>{reflection.quote}</Text>
      <Text style={styles.text}>{reflection.dailyReflection}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'left'
  },
  title: {
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default Reflection;
