import { ColorSchemeName, StyleSheet } from 'react-native';
import ForwardedScrollView, { View } from '../components/Themed';
import React, { useRef, useState } from 'react';
import {
  constructDateFromId,
  setCurrentDate,
  setCurrentDay
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
    dispatch(setCurrentDate(currentDate));
    dispatch(setCurrentDay(currentDay));
  };

  // Render app
  const renderApp = () => {
    return (
      <ForwardedScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}>
        {/* Logo */}
        <FontAwesome5
          style={styles.icon}
          name='chair'
          size={50}
          color={Colours[colorScheme].icon}
        />
        {/* Title */}
        <MonoText style={styles.title}>Just for today</MonoText>
        {/* Divider */}
        <View
          style={styles.separator}
          lightColor={Colours[colorScheme].seperator}
          darkColor={Colours[colorScheme].seperator}
        />
        {/* Calendar icon */}
        <FontAwesome5
          style={styles.icon}
          name='calendar-alt'
          size={25}
          onPress={() => toggleCalendar()}
          color={Colours[colorScheme].icon}
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
    padding: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  icon: {
    textAlign: 'center'
  },
  separator: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '100%'
  }
});

export default Home;
