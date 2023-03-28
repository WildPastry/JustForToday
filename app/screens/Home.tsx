/* eslint-disable */
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AppState } from '../redux/store';
import { MonoText } from '../components/StyledText';
import { StyleSheet } from 'react-native';
import getDailyReflections from '../api/getDailyReflections';
import { useCallback, useEffect } from 'react';
import { View } from '../components/Themed';
import { setReflections } from '../redux/slices/dataSlice';
import Reflection from '../components/Reflection';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // App selector for reading app data loading state
  const appLoading = useAppSelector((state: AppState): Loading => {
    return state.loading;
  });

  // Callback / dispatch and effects
  const setDailyReflections = useCallback((data: DailyReflection[]): void => {
      dispatch(setReflections(data));
  }, []);

  useEffect((): void => {
    const data = getDailyReflections();
    setDailyReflections(data);
  }, [setDailyReflections]);
  
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Just for today</MonoText>
      <Reflection />
    </View>
  );
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
