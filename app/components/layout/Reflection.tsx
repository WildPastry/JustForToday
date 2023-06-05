import { EDateFormat, IDate } from '../../types/date.types';
import { FontBold, FontLight, FontRegular } from '../styles/StyledText';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../styles/Themed';
import { setSelectedDate, setSelectedDay } from '../../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import { AppState } from '../../redux/store';
import { IReflection } from '../../types/data.types';
import add from 'date-fns/add';
import format from 'date-fns/format';

const Reflection: React.FC = (): JSX.Element => {
  // Component settings
  const dispatch = useAppDispatch();
  const [reflection, setReflection] = useState<IReflection>({
    id: '',
    date: '',
    title: '',
    quote: '',
    source: '',
    reflection: ''
  });

  // Data from store
  const reflections: IReflection[] = useAppSelector(
    (state: AppState): IReflection[] => {
      return state.data.reflections;
    }
  );

  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // Effect for setting the current reflection based on date
  useEffect(() => {
    selectReflection(dates.selectedDay, reflections);
  }, [reflections]);

  const getCurrentDay = (): string => {
    // Calculate current day
    const currentDay = format(new Date(), EDateFormat.ddMM);
    // Update store
    dispatch(setSelectedDate(Date.now()));
    dispatch(setSelectedDay(currentDay));
    return currentDay;
  };

  const getPrevDay = (): string => {
    // Calculate previous day
    const currentDate = new Date(dates.selectedDate);
    const prevDate = add(currentDate, { days: -1 });
    const prevDay = format(prevDate, EDateFormat.ddMM);
    // Update store
    dispatch(setSelectedDate(prevDate.getTime()));
    dispatch(setSelectedDay(prevDay));
    return prevDay;
  };

  const getNextDay = (): string => {
    // Calculate next day
    const currentDate = new Date(dates.selectedDate);
    const nextDate = add(currentDate, { days: 1 });
    const nextDay = format(nextDate, EDateFormat.ddMM);
    // Update store
    dispatch(setSelectedDate(nextDate.getTime()));
    dispatch(setSelectedDay(nextDay));
    return nextDay;
  };

  // Select the reflection from the data
  const selectReflection = (id: string, reflections: IReflection[]): void => {
    const currentReflection = reflections.find((reflection) => {
      return reflection.id === id;
    });
    // If a matching reflection is found - set with matched data
    if (currentReflection) {
      setReflection({
        id: currentReflection.id,
        date: currentReflection.date,
        title: currentReflection.title,
        quote: currentReflection.quote,
        source: currentReflection.source,
        reflection: verifyData(currentReflection.reflection)
      });
      // Set a blank reflection otherwise
    } else {
      setReflection({
        id: '',
        date: '',
        title: 'No data available',
        quote: '',
        source: '',
        reflection: ''
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
      <View style={styles.controls}>
        <Pressable onPress={() => selectReflection(getPrevDay(), reflections)}>
          <Text>PREV</Text>
        </Pressable>
        <Pressable
          onPress={() => selectReflection(getCurrentDay(), reflections)}>
          <Text>TODAY</Text>
        </Pressable>
        <Pressable onPress={() => selectReflection(getNextDay(), reflections)}>
          <Text>NEXT</Text>
        </Pressable>
      </View>
      {/* Reflection */}
      <FontLight style={styles.date}>{reflection.date}</FontLight>
      <FontBold style={styles.title}>{reflection.title}</FontBold>
      <FontLight style={styles.quote}>{reflection.quote}</FontLight>
      <FontRegular style={styles.text}>{reflection.reflection}</FontRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  date: {
    fontSize: 21,
    lineHeight: 25,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.3,
    marginBottom: 10,
    textAlign: 'left'
  },
  title: {
    fontSize: 21,
    lineHeight: 21,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center'
  },
  quote: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.3,
    marginBottom: 10,
    textAlign: 'left'
  }
});

export default Reflection;
