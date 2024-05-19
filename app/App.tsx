import 'react-native-gesture-handler';
import 'expo-dev-client';
import { ColorSchemeName } from 'react-native';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import store from './redux/store';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Text, View } from './components/styles/Themed';

// const AppWithProvider: React.FC = (): JSX.Element => {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// };

const App: React.FC = (): JSX.Element | null => {
  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  // Loading settings
  const isLoadingComplete: boolean = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <View>
      <Text>JFT</Text>
      {/* <Navigation colorScheme={colorScheme} /> */}
      {/* <StatusBar /> */}
  </View>
    // <SafeAreaProvider>
    //   <SafeAreaView>
    //     <Navigation colorScheme={colorScheme} />
    //     <StatusBar />
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default registerRootComponent(App);
