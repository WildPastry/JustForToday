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
    console.log('UPGRADE');
  };
  const handleSuggestions = (): void => {
    console.log('SUGGESTIONS');
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
      <Text style={styles.subTitle}>Love the app?</Text>
      <Text style={styles.text}>
        Help the developer create other benificial projects by upgrading. The
        PRO version contains cosmetic changes only and includes custom colour
        themes.
      </Text>
      <Pressable style={styles.btn} onPress={() => handleUpgrade()}>
        <Text>UPGRADE</Text>
      </Pressable>
      <Text style={styles.subTitle}>Suggestions?</Text>
      <Text style={styles.text}>
        If you have any suggestions or requests for features to improve the app
        you can send them directly to the developer.
      </Text>
      <Pressable onPress={() => handleSuggestions()}>
        <Text>SUGGESTIONS</Text>
      </Pressable>
      {/* Divider */}
      <View
        style={styles.separator}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
      />
      <Text style={styles.text}>
        All literature is taken with permission from Alcoholics Anonymous World
        Services, Inc.
      </Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10
  },
  text: {
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 10
  },
  btn: {
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
    width: '100%'
  }
});

export default About;