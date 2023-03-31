import { AppState } from '../redux/store';
import { DailyReflection } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from '../components/Themed';
import { useAppSelector } from '../redux/hooks';

const Reflection: React.FC = (): JSX.Element => {
  const dailyReflection = useAppSelector(
    (state: AppState): DailyReflection[] => {
      return state.data.dailyReflections;
    }
  );
  return <Text style={styles.text}>{dailyReflection[0].id}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
});

export default Reflection;
