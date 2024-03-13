import { FontDisplay } from '../components/styles/StyledText';
import Fonts from '../constants/Fonts';
import { IDeviceSize } from '../types/generic.types';
import { StyleSheet } from 'react-native';
import { View } from '../components/styles/Themed';
import getDeviceSize from '../constants/Layout';

const ErrorScreen: React.FC = (): JSX.Element => {
  // Screen settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    <View style={[styles.container, Fonts[deviceSize].container]}>
      <FontDisplay style={Fonts[deviceSize].title}>ErrorScreen</FontDisplay>
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

export default ErrorScreen;
