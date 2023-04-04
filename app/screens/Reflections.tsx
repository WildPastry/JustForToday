import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import { DailyReflection } from '../types/data.types';
import { MonoText } from '../components/StyledText';
import ReflectionItem from '../components/ReflectionItem';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { useAppSelector } from '../redux/hooks';

const Reflections: React.FC = (): JSX.Element => {
  // App selector for app data
  const dailyReflections = useAppSelector(
    (state: AppState): DailyReflection[] => {
      return state.data.dailyReflections;
    }
  );

  // Data local state
  const [reflections, setReflections] = useState<DailyReflection[]>([]);

  useEffect(() => {
    setReflections(dailyReflections);
  }, []);

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>Reflections</MonoText>
      {reflections.map((reflection, index) => (
        <ReflectionItem key={index} id={reflection.id} />
      ))}
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

export default Reflections;
