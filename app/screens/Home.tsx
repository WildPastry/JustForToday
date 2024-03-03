import { ColorSchemeName, StyleSheet } from 'react-native';
import { ForwardedScrollView, View } from '../components/styles/Themed';
import React, { useRef, useState } from 'react';
import {
  constructDateFromId,
  setSelectedDate,
  setSelectedDay
} from '../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AppState } from '../redux/store';
import Calendar from '../components/layout/Calendar';
import Colours from '../constants/Colours';
import ErrorScreen from './ErrorScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontDisplay } from '../components/styles/StyledText';
import Reflection from '../components/layout/Reflection';
import useColorScheme from '../hooks/useColorScheme';
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
      scrollToTop();
      // Hide calendar when unfocused
      return () => setShowCalendar(false);
    }, [])
  );

  const scrollToTop = (): void => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };

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
          <FontDisplay style={styles.title}>Just for today</FontDisplay>
        </View>
        {/* Divider */}
        <View
          style={styles.divider}
          lightColor={Colours.light.seperator}
          darkColor={Colours.dark.seperator}
        />
        {/* Components */}
        {showCalendar ? (
          <Calendar
            handleCalendarChange={updateReflection}
            handleScrollPosition={scrollToTop}
          />
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
    marginBottom: 10,
    marginTop: 20,
    height: 1,
    width: '70%'
  }
});

export default Home;
