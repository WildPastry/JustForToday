import { ColorSchemeName, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/styles/Themed';
import Colours from '../constants/Colours';
import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '../types/navigation.types';
import getDeviceSize from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

export default function NotFoundScreen({
  navigation
}: RootStackScreenProps<'NotFound'>) {
  // Screen settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    <View style={[styles.container, Control[deviceSize].container]}>
      <View style={styles.notFoundContainer}>
        <MaterialIcons
          style={styles.notFoundIcon}
          name='error'
          size={Control[deviceSize].icon}
          color={Colours[colorScheme].text}
        />
        <Text style={Control[deviceSize].text}>This screen doesn't exist.</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}>
        <Text
          style={Control[deviceSize].text}
          lightColor={Colours.light.link}
          darkColor={Colours.dark.link}>
          Go to home screen
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  notFoundContainer: {
    flexDirection: 'row'
  },
  notFoundIcon: {
    paddingRight: 10
  },
  link: {
    marginTop: 30
  }
});
