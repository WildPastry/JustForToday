import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { StatusBar } from 'expo-status-bar';

const ModalScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ModalScreen;
