import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { StatusBar } from 'expo-status-bar';
import useColorScheme from '../../app/hooks/useColorScheme';

const Info: React.FC = (): JSX.Element => {
  // Colour settings
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      {/* Title */}
      <MonoText style={styles.title}>Info</MonoText>
      {/* Divider */}
      <View
        style={styles.separator}
        lightColor={Colors[colorScheme].seperator}
        darkColor={Colors[colorScheme].seperator}
      />
      <Text style={styles.text}>
        Is an app with the daily reflections, twelve steps, and twelve tradtions
        ready at the tap of button.
      </Text>
      <Text style={styles.text}>
        To support the developer to create more helpful projects you can upgrade
        the app to S Tier by clicking the button below.
      </Text>
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
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 10
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%'
  }
});

export default Info;
