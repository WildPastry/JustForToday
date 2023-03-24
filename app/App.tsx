import { StyleSheet, Text, View } from 'react-native';

import Home from './screens/home/Home';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';

const App: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Just for today</Text>
      <Home />
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#227093',
    flex: 1,
    justifyContent: 'center',
    padding: 50
  },
  title: {
    color: '#f7f1e3',
    fontSize: 25
  }
});

export default registerRootComponent(App);
