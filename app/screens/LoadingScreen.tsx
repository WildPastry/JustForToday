import { fontDisplay } from '../components/styles/StyledText';
import { StyleSheet } from 'react-native';

const LoadingScreen: React.FC = (): JSX.Element => {
  // Loading quote
  const selectLoadingQuote = (): string => {
    return 'Loading';
  };

  return <fontDisplay style={styles.title}>{selectLoadingQuote()}</fontDisplay>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  }
});

export default LoadingScreen;
