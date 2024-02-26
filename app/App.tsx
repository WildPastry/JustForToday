import { Text, View } from './components/styles/Themed';
import { ColorSchemeName } from 'react-native';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';
import store from './redux/store';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

const AppWithProvider: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App: React.FC = (): JSX.Element | null => {
  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  // Loading settings
  const isLoadingComplete: boolean = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      {/* <Navigation colorScheme={colorScheme} /> */}
      <View style={styles.container}>
        <Text style={styles.title}>JFT</Text>
      </View>
      <StatusBar />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#445566',
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  title: {
    color: 'white',
    fontSize: 50
  }
});

export default registerRootComponent(AppWithProvider);
