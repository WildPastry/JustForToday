/* eslint-disable */
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import dailyReflections from './assets/content/daily-reflections.json';
import { registerRootComponent } from 'expo';
const App: React.FC = (): JSX.Element => {

  const dailyReflectionsData: DailyReflection[] = dailyReflections;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Just for today</Text>
      <Text style={styles.desc}>{dailyReflectionsData[0].quote}</Text>
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
  },
  desc: {
    color: '#f7f1e3',
    fontSize: 15
  }
});

export default registerRootComponent(App);
