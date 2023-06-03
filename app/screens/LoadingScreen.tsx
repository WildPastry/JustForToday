import { DisplayRegular } from '../components/styles/StyledText';
import { StyleSheet } from 'react-native';

const LoadingScreen: React.FC = (): JSX.Element => {
  // Loading quote
  const selectLoadingQuote = (): string => {
    return 'Loading';
  };

  return <DisplayRegular style={styles.title}>{selectLoadingQuote()}</DisplayRegular>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  }
});

export default LoadingScreen;
