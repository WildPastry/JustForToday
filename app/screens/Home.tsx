import { useCallback, useEffect } from 'react';
import { MonoText } from '../components/StyledText';
import getDailyReflections from '../api/getDailyReflections';
import { setReflections } from '../redux/slices/reflectionSlice';
import { useAppDispatch } from '../redux/hooks';
import Reflection from '../components/Reflection';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // Callback / dispatch and effects to set data on screen load
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
