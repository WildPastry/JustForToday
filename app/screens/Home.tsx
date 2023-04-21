import { ColorSchemeName, StyleSheet } from 'react-native';
import ForwardedScrollView, { ScrollView, View } from '../components/Themed';
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
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

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
              style={styles.icon}
              name='chair'
              size={50}
              color={Colors[colorScheme].icon}
            />
            {/* Title */}
            <MonoText style={styles.title}>Just for today</MonoText>
            {/* Divider */}
            <View
              style={styles.separator}
              lightColor={Colors[colorScheme].seperator}
              darkColor={Colors[colorScheme].seperator}
            />
            {/* Calendar icon */}
            <FontAwesome5
              style={styles.icon}
              name='calendar-alt'
              size={25}
              onPress={() => toggleCalendar()}
              color={Colors[colorScheme].icon}
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
    width: '80%'
  }
});

export default Home;
