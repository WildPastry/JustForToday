import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import useColorScheme from '../../app/hooks/useColorScheme';

const Info: React.FC = (): JSX.Element => {
  // Colour settings
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Info</Text>
      {/* Divider */}
      <View
        style={styles.separator}
        lightColor={Colors[colorScheme].seperator}
        darkColor={Colors[colorScheme].seperator}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%'
  }
});

export default Info;
