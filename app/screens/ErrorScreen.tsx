import { FontDisplay } from '../components/styles/StyledText';
import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import { StyleSheet } from 'react-native';
import { View } from '../components/styles/Themed';
import getDeviceSize from '../constants/Layout';

const ErrorScreen: React.FC = (): JSX.Element => {
  // Screen settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    <View style={[styles.container, Control[deviceSize].container]}>
      <FontDisplay style={Control[deviceSize].title}>ErrorScreen</FontDisplay>
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
