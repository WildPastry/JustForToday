/* eslint-disable */
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import { IDailyReflections } from '../types/data.types';
import add from 'date-fns/add';
import { getCurrentDay, getCurrentDate, setCurrentDay } from '../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IDate } from '../types/date.types';
import format from 'date-fns/format';

const Reflection: React.FC = (): JSX.Element => {
  // Selectors for store
  const dailyReflections = useAppSelector(
    (state: AppState): IDailyReflections[] => {
      return state.data.dailyReflections;
    }
  );

  const dates = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // Set up dispatch
  const dispatch = useAppDispatch();

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
  // const [currentDate, setCurrentDate] = useState(new Date());

  // Effect for setting the current reflection based on date
  useEffect(() => {
    selectReflection(dates.currentDay, dailyReflections);
    // const test1 = new Date('01/03')
    // const test = format(test1, 'ddMM');
    // console.log(test, test1)
  }, [dailyReflections]);

  const getPrevDay = (): string => {
    // Calculate previous day
    const currentDate = new Date(dates.currentDay);
    console.log(currentDate)
    const prevDate = add(currentDate, { days: -1 });
    const prevDay = format(prevDate, 'ddMM');
    dispatch(setCurrentDay(prevDay));
    console.log('prevDay', prevDay)
    return prevDay;
  };

  const getNextDay = (): string => {
     // Calculate next day
     const currentDate = new Date(dates.currentDay);
     console.log(currentDate)
     const nextDate = add(currentDate, { days: 1 });
     const nextDay = format(nextDate, 'ddMM');
     dispatch(setCurrentDay(nextDay));
     console.log('nextDay', nextDay)
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
        date: getCurrentDate(id),
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
