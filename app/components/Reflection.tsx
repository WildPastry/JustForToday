/* eslint-disable */
import { Text, View } from './Themed';
import { AppState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';

const Reflection: React.FC = (): JSX.Element => {
  // App selector for reading app data loading state
  const appLoading = useAppSelector((state: AppState): Loading => {
    return state.loading;
  });
  const dailyReflection = useAppSelector(
    (state: AppState): DailyReflection[] => {
      return state.data.dailyReflections;
    }
  );

  const showReflection = () => {
    if (!appLoading) {
      return dailyReflection[0].id;
    } else return 'reflection'
  };

  return (
    <View>
      <Text>{showReflection()}</Text>
    </View>
  );
};

export default Reflection;
