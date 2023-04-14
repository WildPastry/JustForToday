import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

const Steps: React.FC = (): JSX.Element => {
  // Colour settings
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <MaterialCommunityIcons
        style={styles.text}
        name='stairs'
        size={50}
        color={Colors[colorScheme].text}
      />
      <MonoText style={styles.title}>Steps</MonoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20
  },
  text: {
    textAlign: 'center'
  }
});

export default Steps;
