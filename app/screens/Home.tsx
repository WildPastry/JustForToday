import ForwardedScrollView, { ScrollView } from '../components/Themed';
import {
  constructDateFromId,
  setCurrentDate,
  setCurrentDay
} from '../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AppState } from '../redux/store';
import Calendar from '../components/Calendar';
import Colors from '../constants/Colors';
import ErrorScreen from './ErrorScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen';
import { MonoText } from '../components/StyledText';
import Reflection from '../components/Reflection';
import { StyleSheet } from 'react-native';
import { setData } from '../redux/slices/dataSlice';
import useColorScheme from '../../app/hooks/useColorScheme';

const Home: React.FC = (): JSX.Element => {
  // Create ref for functional scroll view
  const scrollViewRef = useRef<any>(null);

  // Set up isFocused hook for tracking component
  const isFocused = useIsFocused();

  // Navigation
  const navigation = useNavigation();

  // Selectors for store
  const appLoading = useAppSelector((state: AppState): boolean => {
    return state.data.loading;
  });

  const appError = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  // Colour settings
  const colorScheme = useColorScheme();

  // Dispatch settings
  const dispatch = useAppDispatch();

  // Local data
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect((): void => {
    // Effect for setting app data
    dispatch(setData());
    // Reset calendar state when routing back to home
    navigation.addListener('focus', (): void => {
      setShowCalendar(false);
    });
    if (isFocused) {
      // Re-render component when focused to reset scroll view
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [setData, navigation, isFocused]);

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
  const renderApp = (appLoading: boolean) => {
    return (
      <ForwardedScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}>
        {appLoading ? (
          <LoadingScreen />
        ) : (
          <ScrollView>
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
              <Calendar handleCalendarChange={updateReflection} />
            ) : (
              <Reflection />
            )}
          </ScrollView>
        )}
      </ForwardedScrollView>
    );
  };
  // Check for error state
  return appError ? errorScreen() : renderApp(appLoading);
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 20
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
