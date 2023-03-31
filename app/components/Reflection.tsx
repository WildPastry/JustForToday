import { Text, View } from '../components/Themed';
import { AppState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';

const Reflection: React.FC = (): JSX.Element => {
  const dailyReflection = useAppSelector(
    (state: AppState): DailyReflection[] => {
      return state.data.dailyReflections;
    }
  );
  return (
    <View>
      <Text>{dailyReflection[0].quote}</Text>
    </View>
  );
};

export default Reflection;
