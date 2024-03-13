import { ColorSchemeName, StyleSheet } from 'react-native';
import { FontDisplay, FontDisplayBold } from '../components/styles/StyledText';
import { ForwardedScrollView, View } from '../components/styles/Themed';
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
import Fonts from '../constants/Fonts';
import { IDeviceSize } from '../types/generic.types';
import Reflection from '../components/Reflection';
import getDeviceSize from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const Home: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();
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
        contentContainerStyle={[styles.container, Fonts[deviceSize].container]}
        ref={scrollViewRef}>
        {/* Calendar icon */}
        <View style={styles.calendarIconContainer}>
          <FontAwesome5
            style={styles.calendarIcon}
            name='calendar-alt'
            size={Fonts[deviceSize].icon}
            onPress={() => toggleCalendar()}
            color={Colours[colorScheme].icon}
          />
        </View>
        <View style={styles.logoContainer}>
          {/* Logo */}
          <FontAwesome5
            style={styles.icon}
            name='chair'
            size={Fonts[deviceSize].icon}
            color={Colours[colorScheme].icon}
          />
          {/* Title */}
          <View style={styles.titleContainer}>
            <FontDisplay style={Fonts[deviceSize].title}>Just for </FontDisplay>
            <FontDisplayBold
              style={[
                Fonts[deviceSize].title,
                { color: Colours[colorScheme].link }
              ]}>
              today
            </FontDisplayBold>
          </View>
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
    alignSelf: 'stretch'
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    marginLeft: 10
  },
  icon: {
    textAlign: 'center'
  },
  calendarIconContainer: {
    alignItems: 'flex-end'
  },
  calendarIcon: {
    paddingLeft: 30,
    paddingVertical: 10
  },
  divider: {
    alignSelf: 'center',
    height: 1,
    marginBottom: 10,
    marginTop: 20,
    width: '70%'
  }
});

export default Home;
