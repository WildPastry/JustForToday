import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Just for today</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#227093',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#f7f1e3',
    fontSize: 25
  }
});
