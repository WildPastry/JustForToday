/* eslint-disable */
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AppState } from '../redux/store';
import { MonoText } from '../components/StyledText';
import { StyleSheet } from 'react-native';
import getDailyReflections from '../api/getDailyReflections';
import { useCallback, useEffect } from 'react';
import { View } from '../components/Themed';
import { setReflectionData } from '../redux/slices/dataSlice';
import { useDispatch } from 'react-redux';
import Reflection from '../components/Reflection';

const Home: React.FC = (): JSX.Element => {
  // App selector for reading app data loading state
  const appLoading = useAppSelector((state: AppState): Loading => {
    return state.loading;
  });

  // Callback / dispatch and effects
  const setDataLoad = useCallback((data: DailyReflections): void => {
    setTimeout(() => {
      setReflectionData(data);
    }, 1000);
  }, []);

  useEffect((): void => {
    const data = getDailyReflections();
    setDataLoad(data);
  }, [setDataLoad]);
  
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
