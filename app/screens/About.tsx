/* eslint-disable max-len */
import {
  ColorSchemeName,
  Linking,
  Platform,
  Pressable,
  StyleSheet
} from 'react-native';
import ForwardedScrollView, { Text, View } from '../components/styles/Themed';
import React, { useRef } from 'react';
import Colours from '../constants/Colours';
import { FontAwesome } from '@expo/vector-icons';
import { FontDisplay } from '../components/styles/StyledText';
import { StatusBar } from 'expo-status-bar';
import packageJson from '../../package.json';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const About: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  const handleSuggestions = (): void => {
    Linking.openURL(
      'mailto:justfortoday@mikeparker.co.nz?subject=SendMail&body=App Suggestion'
    );
  };

  const handleLink = (): void => {
    Linking.openURL('https://www.aa.org/');
  };

  const getAppVersion = (): string => {
    return packageJson.version.toString();
  };

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top on focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      return () => null;
    }, [scrollViewRef])
  );

  return (
    <ForwardedScrollView
      contentContainerStyle={styles.container}
      ref={scrollViewRef}>
      {/* Logo */}
      <FontAwesome
        style={styles.icon}
        name='info-circle'
        size={50}
        color={Colours[colorScheme].text}
      />
      {/* Title */}
      <FontDisplay style={styles.title}>About the app</FontDisplay>
      <Text style={styles.versionText}>
        JustForToday app version {getAppVersion()}
      </Text>
      {/* Divider */}
      <View
        style={styles.divider}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
      />
      {/* Information */}
      <Text style={styles.text}>
        Daily reflections, steps, and tradtions with zero advertisments.
      </Text>
      <Text style={styles.text}>
        Created to give people in the fellowship fast access to well known AA
        literature at the touch of a Btn.
      </Text>
      {/* Suggestions */}
      <Text style={styles.subTitle}>Suggestions?</Text>
      <Text style={styles.text}>
        If you have any suggestions or requests for features to improve the app
        you can send them directly to the developer.
      </Text>
      {/* Suggestions Btn */}
      <Pressable
        style={[styles.helpLinkBtn, styles[`${colorScheme}HelpLinkBtn`]]}
        onPress={() => handleSuggestions()}>
        <Text style={styles.textCenter}>SUGGESTIONS</Text>
      </Pressable>
      {/* Divider */}
      <View
        style={styles.divider}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
      />
      {/* AA disclaimer and link*/}
      <Text style={styles.text}>
        All literature is taken with permission from{' '}
        <Text
          onPress={() => handleLink()}
          lightColor={Colours.light.link}
          darkColor={Colours.dark.link}>
          Alcoholics Anonymous World Services, Inc.
        </Text>
      </Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ForwardedScrollView>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center'
  },
  container: {
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
  versionText: {
    textAlign: 'center',
    lineHeight: 20
  },
  icon: {
    marginBottom: 10,
    textAlign: 'center'
  },
  divider: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '70%'
  },
  helpLinkBtn: {
    borderRadius: 12,
    marginVertical: 15,
    paddingVertical: 12
  },
  lightHelpLinkBtn: {
    backgroundColor: '#e5edf9'
  },
  darkHelpLinkBtn: {
    backgroundColor: '#171b43'
  }
});

export default About;
