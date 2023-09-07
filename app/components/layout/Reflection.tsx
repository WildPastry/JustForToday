/* eslint-disable max-lines-per-function */
import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { EDateFormat, IDate } from '../../types/date.types';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {
  FontBold,
  FontDisplay,
  FontLight,
  FontRegular
} from '../styles/StyledText';
import ForwardedScrollView, { View } from '../styles/Themed';
import React, { useEffect, useState } from 'react';
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

const Reflection: React.FC = (): JSX.Element => {
  // Component settings
  const dispatch = useAppDispatch();
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
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

  // Title for controls
  const getMiddleButton = (): string => {
    if (dates.currentDay === format(new Date(), EDateFormat.ddMM)) {
      return 'TODAY';
    }
    return 'BACK TO TODAY';
  };

  // Calendar screen
  const calendarScreen = (): JSX.Element => {
    return (
      <Calendar
        handleCalendarChange={updateReflection}
        handleCalendarState={setShowCalendar}
      />
    );
  };

  // Reflection screen
  const reflectionScreen = (): JSX.Element => {
    return (
      <ForwardedScrollView contentContainerStyle={styles.container}>
        {/* Controls */}
        <View style={styles.controls}>
          <Pressable
            style={styles.prevNextBtn}
            onPress={() => selectReflection(getPrevDay(), reflections)}>
            <FontAwesome
              name='chevron-left'
              size={20}
              color={Colours[colorScheme].icon}
            />
            <FontLight style={{ marginLeft: 10 }}>PREV</FontLight>
          </Pressable>
          <Pressable
            onPress={() => {
              selectReflection(getCurrentDay(), reflections);
              setShowCalendar(false);
            }}>
            <FontLight>{getMiddleButton()}</FontLight>
          </Pressable>
          <Pressable
            style={styles.prevNextBtn}
            onPress={() => selectReflection(getNextDay(), reflections)}>
            <FontLight style={{ marginRight: 10 }}>NEXT</FontLight>
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
        {/* Reflection */}
        <FontBold style={styles.title}>{reflection.title}</FontBold>
        <FontLight style={styles.quote}>{reflection.quote}</FontLight>
        <FontRegular style={styles.text}>{reflection.reflection}</FontRegular>
      </ForwardedScrollView>
    );
  };

  return showCalendar ? calendarScreen() : reflectionScreen();
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 15
  },
  prevNextBtn: {
    flexDirection: 'row'
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
