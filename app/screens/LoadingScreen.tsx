import { Text, View } from '../components/styles/Themed';
import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import { StyleSheet } from 'react-native';
import getDeviceSize from '../constants/Layout';

const LoadingScreen: React.FC = (): JSX.Element => {
  // Screen settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  // Loading quote
  const selectLoadingQuote = (): string => {
    return 'Loading';
  };

  return (
    <View style={[styles.container, Control[deviceSize].container]}>
      <Text style={Control[deviceSize].text}>{selectLoadingQuote()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export default LoadingScreen;
