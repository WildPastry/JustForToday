/* eslint-disable */
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AppState } from '../redux/store';
import Calendar from '../components/Calendar';
import Colors from '../constants/Colors';
import ErrorScreen from './ErrorScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen';
import { MonoText } from '../components/StyledText';
import Reflection from '../components/Reflection';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { setData } from '../redux/slices/dataSlice';
import useColorScheme from '../../app/hooks/useColorScheme';
import { useEffect, useState } from 'react';

const Home: React.FC = (): JSX.Element => {
  // Selectors for store
  const appLoading = useAppSelector((state: AppState): boolean => {
    return state.data.loading;
  });

  const appError = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  // Colour settings
  const colorScheme = useColorScheme();

  // Set up dispatch
  const dispatch = useAppDispatch();

  // Data local states
  const [showCalendar, setShowCalendar] = useState(false);

  // Effect for setting app data
  useEffect((): void => {
    dispatch(setData());
  }, [setData]);

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  const toggleCalendar = (): void => {
    setShowCalendar(!showCalendar);
  };

  // Render app
  const renderApp = (appLoading: boolean) => {
    return (
      <View style={styles.container}>
        {appLoading ? (
          <LoadingScreen />
        ) : (
          <View>
            {/* Logo */}
            <FontAwesome5
              style={styles.text}
              name='chair'
              size={50}
              color={Colors[colorScheme].text}
            />
            {/* Title */}
            <MonoText style={styles.title}>Just for today</MonoText>
            {/* Calendar icon */}
            <FontAwesome5
              style={styles.text}
              name='calendar-alt'
              size={25}
              onPress={() => toggleCalendar()}
              color={Colors[colorScheme].text}
            />
            {/* Components */}
            {showCalendar ? (
              <Calendar handleCalendarChange={toggleCalendar} />
            ) : (
              <Reflection />
            )}
          </View>
        )}
      </View>
    );
  };
  // Check for error state
  return appError ? errorScreen() : renderApp(appLoading);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center'
  }
});

export default Home;
