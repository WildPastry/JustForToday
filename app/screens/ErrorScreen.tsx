import { ColorSchemeName, StyleSheet } from 'react-native';
import { Text, View } from '../components/styles/Themed';
import Colours from '../constants/Colours';
import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import { MaterialIcons } from '@expo/vector-icons';
import getDeviceSize from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

const ErrorScreen: React.FC = (): JSX.Element => {
  // Screen settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    <View style={[styles.container, Control[deviceSize].container]}>
      <View style={styles.errorContainer}>
        <MaterialIcons
          style={styles.errorIcon}
          name='error'
          size={Control[deviceSize].icon}
          color={Colours[colorScheme].text}
        />
        <Text style={Control[deviceSize].text}>Error, please try again.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  errorContainer: {
    flexDirection: 'row'
  },
  errorIcon: {
    paddingRight: 10
  }
});

export default ErrorScreen;
