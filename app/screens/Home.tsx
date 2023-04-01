import { DailyReflection, Loading } from '../types/data.types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useCallback, useEffect } from 'react';
import { AppState } from '../redux/store';
import Colors from '../constants/Colors';
import ErrorScreen from './ErrorScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen';
import { MonoText } from '../components/StyledText';
import Reflection from '../components/Reflection';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import getDailyReflections from '../api/getDailyReflections';
import { setReflections } from '../redux/slices/reflectionSlice';
import useColorScheme from '../../app/hooks/useColorScheme';

const Home: React.FC = (): JSX.Element => {
  // Colour settings
  const colorScheme = useColorScheme();

  // Set up dispatch
  const dispatch = useAppDispatch();

  // App selector for app loading state
  const appLoading = useAppSelector((state: AppState): Loading => {
    return state.loading;
  });

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  // Callback / dispatch and effects to set data on screen load
  const setDailyReflections = useCallback((data: DailyReflection[]): void => {
    dispatch(setReflections(data));
  }, []);

  useEffect((): void => {
    const data = getDailyReflections();
    setDailyReflections(data);
  }, [setDailyReflections]);

  // Render app
  const renderApp = (appLoading: Loading) => {
    return (
      <View style={styles.container}>
        {appLoading.isLoading ? (
          <LoadingScreen />
        ) : (
          <View>
            <FontAwesome5
              style={styles.text}
              name='chair'
              size={50}
              color={Colors[colorScheme].text}
            />
            <MonoText style={styles.title}>Just for today</MonoText>
            <Reflection />
          </View>
        )}
      </View>
    );
  };
  // Check for error state
  return appLoading.isError ? errorScreen() : renderApp(appLoading);
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
