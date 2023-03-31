import { Text, View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useCallback, useEffect } from 'react';
import { AppState } from '../redux/store';
import Error from '../screens/Error';
import Loading from '../screens/Loading';
import { MonoText } from '../components/StyledText';
import Reflection from '../components/Reflection';
import { StyleSheet } from 'react-native';
import getDailyReflections from '../api/getDailyReflections';
import { setReflections } from '../redux/slices/reflectionSlice';

const Home: React.FC = (): JSX.Element => {
  // Set up dispatch
  const dispatch = useAppDispatch();

  // App selector for reading app data loading state
  const appLoading = useAppSelector((state: AppState): Loading => {
    return state.loading;
  });

  // Date
  const newDate: string = new Date().toLocaleString();

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <Error />;
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
          <Loading />
        ) : (
          <View>
            <MonoText style={styles.title}>Just for today</MonoText>
            <Text>{newDate}</Text>
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
    fontSize: 20
  }
});

export default Home;
