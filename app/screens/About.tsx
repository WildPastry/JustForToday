/* eslint-disable no-console */
import { ColorSchemeName, Platform, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Colours from '../constants/Colours';
import { FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { StatusBar } from 'expo-status-bar';
import useColorScheme from '../hooks/useColorScheme';

const About: React.FC = (): JSX.Element => {
  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  const handleUpgrade = (): void => {
    console.log('Upgrade app');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <FontAwesome
        style={styles.icon}
        name='info-circle'
        size={50}
        color={Colours[colorScheme].text}
      />
      {/* Title */}
      <MonoText style={styles.title}>About the app</MonoText>
      {/* Divider */}
      <View
        style={styles.separator}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
      />
      <Text style={styles.text}>
        Daily reflections, steps, and tradtions with zero advertisments.
      </Text>
      <Text style={styles.text}>
        Created to give people in the fellowship fast access to well known AA
        literature at the touch of a button.
      </Text>
      <Text style={styles.title}>Love the app?</Text>
      <Text style={styles.text}>
        Help the developer create other valuable and benificial projects by
        upgrading to PRO. PRO version is cosmetic only and includes new custom
        colour themes.
      </Text>
      <Pressable onPress={() => handleUpgrade()}>
        <Text>UPGRADE</Text>
      </Pressable>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  icon: {
    marginBottom: 10,
    textAlign: 'center'
  },
  separator: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '80%'
  }
});

export default About;
