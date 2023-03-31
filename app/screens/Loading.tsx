import { MonoText } from '../components/StyledText';
import { StyleSheet } from 'react-native';

const Loading: React.FC = (): JSX.Element => {
  // Loading quote
  const selectLoadingQuote = (): string => {
    return 'Loading';
  };

  return <MonoText style={styles.title}>{selectLoadingQuote()}</MonoText>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  }
});

export default Loading;
