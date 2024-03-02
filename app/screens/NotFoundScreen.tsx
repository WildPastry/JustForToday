import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/styles/Themed';
import Colours from '../constants/Colours';
import { RootStackScreenProps } from '../types/navigation.types';

export default function NotFoundScreen({
  navigation
}: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
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
    justifyContent: 'center',
    padding: 15
  },
  title: {
    fontSize: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  },
  linkText: {
    fontSize: 14
  }
});
