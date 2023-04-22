import { MonoText } from '../components/StyledText';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { View } from '../components/Themed';

const LoadingScreen: React.FC = (): JSX.Element => {
  // Loading quote
  const selectLoadingQuote = (): string => {
    return 'Loading';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <ActivityIndicator size='large' color='#000' />
        {/* <MonoText style={styles.title}>{selectLoadingQuote()}</MonoText>; */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc', // set the background color of the screen
  },
  title: {
    fontSize: 20
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', // set the background color of the loading overlay
  },
});

export default LoadingScreen;
