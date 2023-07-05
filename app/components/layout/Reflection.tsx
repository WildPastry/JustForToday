import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { EDateFormat, IDate } from '../../types/date.types';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {
  FontBold,
  FontDisplay,
  FontLight,
  FontRegular
} from '../styles/StyledText';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from '../styles/Themed';
import {
  constructDateFromId,
  setSelectedDate,
  setSelectedDay,
  setSelectedMonth
} from '../../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { AppState } from '../../redux/store';
import Calendar from './Calendar';
import Colours from '../../constants/colours';
import { IReflection } from '../../types/data.types';
import add from 'date-fns/add';
import format from 'date-fns/format';
import globalStyles from '../../constants/globalStyles';
import useColorScheme from '../../../app/hooks/useColorScheme';
import { useFocusEffect } from 'expo-router';

const Reflection: React.FC = (): JSX.Element => {
  // Component settings
  const dispatch = useAppDispatch();
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const [showCalendar, setShowCalendar] = useState(false);
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

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top on focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      // Hide calendar when unfocused
      return () => setShowCalendar(false);
    }, [])
  );

  // Effect for setting the current reflection based on date
  useEffect(() => {
    selectReflection(dates.selectedDay, reflections);
  }, [reflections]);

  const getCurrentDay = (): string => {
    // Calculate current day and month
    const currentDay = format(new Date(), EDateFormat.ddMM);
    const currentMonth = format(new Date(), EDateFormat.MMM);
    // Update store
    dispatch(setSelectedDate(Date.now()));
    dispatch(setSelectedMonth(currentMonth));
    dispatch(setSelectedDay(currentDay));
    return currentDay;
  };

  const getPrevDay = (): string => {
    // Calculate previous day
    const currentDate = new Date(dates.selectedDate);
    const prevDate = add(currentDate, { days: -1 });
    const prevMonth = format(prevDate, EDateFormat.MMM);
    const prevDay = format(prevDate, EDateFormat.ddMM);
    // Update store
    dispatch(setSelectedDate(prevDate.getTime()));
    dispatch(setSelectedMonth(prevMonth));
    dispatch(setSelectedDay(prevDay));
    return prevDay;
  };

  const getNextDay = (): string => {
    // Calculate next day
    const currentDate = new Date(dates.selectedDate);
    const nextDate = add(currentDate, { days: 1 });
    const nextMonth = format(nextDate, EDateFormat.MMM);
    const nextDay = format(nextDate, EDateFormat.ddMM);
    // Update store
    dispatch(setSelectedDate(nextDate.getTime()));
    dispatch(setSelectedMonth(nextMonth));
    dispatch(setSelectedDay(nextDay));
    return nextDay;
  };

  // Hide or show calendar
  const toggleCalendar = (): void => {
    setShowCalendar(!showCalendar);
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

  // Update the current reflection
  const updateReflection = (
    showCalendar: boolean,
    currentDay: string
  ): void => {
    const currentDate: number = constructDateFromId(currentDay);
    // Set local status
    selectReflection(currentDay, reflections);
    // Set calendar status
    setShowCalendar(showCalendar);
    // Update store
    dispatch(setSelectedDate(currentDate));
    dispatch(setSelectedDay(currentDay));
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
        {/* Previous day */}
        <Pressable onPress={() => selectReflection(getPrevDay(), reflections)}>
          <FontAwesome
            name='chevron-left'
            size={20}
            color={Colours[colorScheme].icon}
          />
        </Pressable>
        {/* Calendar and date */}
        <Pressable
          onPress={() => {
            selectReflection(getCurrentDay(), reflections);
            setShowCalendar(false);
          }}>
          <Text>JUST FOR TODAY</Text>
        </Pressable>
        {/* Next day */}
        <Pressable onPress={() => selectReflection(getNextDay(), reflections)}>
          <FontAwesome
            name='chevron-right'
            size={20}
            color={Colours[colorScheme].icon}
          />
        </Pressable>
      </View>
      <View style={globalStyles.headerContainer}>
        {/* Date */}
        <FontDisplay style={styles.date}>{reflection.date}</FontDisplay>
        {/* Calendar icon */}
        <FontAwesome5
          style={styles.calendarIcon}
          name='calendar-alt'
          size={25}
          onPress={() => toggleCalendar()}
          color={Colours[colorScheme].icon}
        />
      </View>
      {/* Divider */}
      <View
        style={styles.divider}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
      />
      <View>
        {/* Calendar */}
        {showCalendar ? (
          <Calendar handleCalendarChange={updateReflection} />
        ) : (
          // Reflection
          <View>
            <FontBold style={styles.title}>{reflection.title}</FontBold>
            <FontLight style={styles.quote}>{reflection.quote}</FontLight>
            <FontRegular style={styles.text}>
              {reflection.reflection}
            </FontRegular>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 15
  },
  calendarIcon: {
    marginLeft: 15
  },
  date: {
    fontSize: 30,
    letterSpacing: 1,
    textAlign: 'center'
  },
  divider: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 25,
    height: 1,
    padding: 0,
    width: '70%'
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.4,
    marginBottom: 15,
    textAlign: 'left'
  },
  title: {
    fontSize: 21,
    lineHeight: 21,
    letterSpacing: 1,
    marginBottom: 15,
    textAlign: 'center'
  },
  quote: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.4,
    marginBottom: 15,
    textAlign: 'left'
  }
});

export default Reflection;
