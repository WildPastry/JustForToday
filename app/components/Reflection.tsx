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

  const newDate: string = new Date().toLocaleString();

  // Error screen
  const errorScreen = (): JSX.Element => {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  };

  const renderApp = (appLoading: Loading) => {
    return (
      <View>
        {appLoading.isLoading ? (
          <Text>Loading</Text>
        ) : (
          <View>
            <Text>{newDate}</Text>
            <Text>{dailyReflection[0].quote}</Text>
          </View>
        )}
      </View>
    );
  };

  return appLoading.isError ? errorScreen() : renderApp(appLoading);
};

export default Reflection;
