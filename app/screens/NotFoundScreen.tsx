import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/styles/Themed';
import Colours from '../constants/Colours';
import Fonts from '../constants/Fonts';
import { IDeviceSize } from '../types/generic.types';
import { RootStackScreenProps } from '../types/navigation.types';
import getDeviceSize from '../constants/Layout';

export default function NotFoundScreen({
  navigation
}: RootStackScreenProps<'NotFound'>) {
  // Screen settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    <View style={[styles.container, Fonts[deviceSize].container]}>
      <Text style={Fonts[deviceSize].title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}>
        <Text
          style={styles.linkText}
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
  link: {
    marginTop: 15,
    paddingVertical: 15
  },
  linkText: {
    fontSize: 15
  }
});
