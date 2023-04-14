import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

const Traditions: React.FC = (): JSX.Element => {
  // Colour settings
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <FontAwesome
        style={styles.text}
        name='book'
        size={50}
        color={Colors[colorScheme].text}
      />
      <MonoText style={styles.title}>Traditions</MonoText>
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

export default Traditions;
