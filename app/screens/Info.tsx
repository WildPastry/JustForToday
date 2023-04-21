/* eslint-disable no-console */
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { StatusBar } from 'expo-status-bar';
import useColorScheme from '../../app/hooks/useColorScheme';

const Info: React.FC = (): JSX.Element => {
  // Colour settings
  const colorScheme = useColorScheme();

  // Handling tap function
  const handleUpgradeTap = (): void => {
    console.log('Upgrade app');
  };

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
        JustForToday is a fast and sexy way to read the daily reflections,
        twelve steps, and twelve tradtions on your smart phone. There are zero
        advertisments and all functionality to use the app on a daily basis is
        100% free.
      </Text>
      <Text style={styles.text}>
        If you want to support the developer to create more helpful projects,
        you can upgrade the app to "Fellowship PRO" for $1 by tapping the button
        below. Fellowship PRO includes new light and dark custom colour themes
        to choose from.
      </Text>
      <Pressable onPress={() => handleUpgradeTap()}>
        <Text>UPGRADE TO FELLOWSHIP PRO</Text>
      </Pressable>
      <Text style={styles.text}>...</Text>
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
