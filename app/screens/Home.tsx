import { ColorSchemeName, StyleSheet } from 'react-native';
import ForwardedScrollView, { View } from '../components/Themed';
import React, { useRef, useState } from 'react';
import {
  constructDateFromId,
  setSelectedDate,
  setSelectedDay
} from '../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AppState } from '../redux/store';
import Calendar from '../components/Calendar';
import Colours from '../constants/Colours';
import ErrorScreen from './ErrorScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import Reflection from '../components/Reflection';
import useColorScheme from '../../app/hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const Home: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useAppDispatch();

  // Data from store
  const appError: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top on focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      // Hide calendar when unfocused
      return () => setShowCalendar(false);
    }, [])
  );

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  // Hide or show calendar
  const toggleCalendar = (): void => {
    setShowCalendar(!showCalendar);
  };

  // Update the current reflection
  const updateReflection = (
    showCalendar: boolean,
    currentDay: string
  ): void => {
    const currentDate: number = constructDateFromId(currentDay);
    // Set calendar status
    setShowCalendar(showCalendar);
    // Update store
    dispatch(setSelectedDate(currentDate));
    dispatch(setSelectedDay(currentDay));
  };

  // Render app
  const renderApp = () => {
    return (
      <ForwardedScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}>
        {/* Calendar icon */}
        <FontAwesome5
          style={styles.calendarIcon}
          name='calendar-alt'
          size={25}
          onPress={() => toggleCalendar()}
          color={Colours[colorScheme].icon}
        />
        <View style={styles.logoContainer}>
          {/* Logo */}
          <FontAwesome5
            style={styles.icon}
            name='chair'
            size={25}
            color={Colours[colorScheme].icon}
          />
          {/* Title */}
          <MonoText style={styles.title}>Just for today</MonoText>
        </View>
        {/* Divider */}
        <View
          style={styles.divider}
          lightColor={Colours[colorScheme].seperator}
          darkColor={Colours[colorScheme].seperator}
        />
        {/* Components */}
        {showCalendar ? (
          <Calendar handleCalendarChange={updateReflection} />
        ) : (
          <Reflection />
        )}
      </ForwardedScrollView>
    );
  };
  // Check for error state
  return appError ? errorScreen() : renderApp();
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 15
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  title: {
    fontSize: 20,
    marginLeft: 10
  },
  icon: {
    textAlign: 'center'
  },
  calendarIcon: {
    textAlign: 'right'
  },
  divider: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '70%'
  }
});

export default Home;
