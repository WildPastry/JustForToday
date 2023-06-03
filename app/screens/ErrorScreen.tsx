import { fontDisplay } from '../components/styles/StyledText';
import { StyleSheet } from 'react-native';
import { View } from '../components/styles/Themed';

const ErrorScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <fontDisplay style={styles.title}>ErrorScreen</fontDisplay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  title: {
    fontSize: 20
  }
});

export default ErrorScreen;
