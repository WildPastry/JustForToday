import { MonoText } from '../components/StyledText';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';

const ErrorScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}>ErrorScreen</MonoText>
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
    fontSize: 20
  }
});

export default ErrorScreen;