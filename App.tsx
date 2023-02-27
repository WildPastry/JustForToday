import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PUFF NO MORE</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B33771',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#F8EFBA',
    fontSize: 30
  },
});
