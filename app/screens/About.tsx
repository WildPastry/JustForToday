/* eslint-disable no-console */
import { ColorSchemeName, Platform, Pressable, StyleSheet } from 'react-native';
import ForwardedScrollView, { Text, View } from '../components/styles/Themed';
import React, { useRef } from 'react';
import Colours from '../constants/Colours';
import ExternalLink from '../components/features/ExternalLink';
import { FontAwesome } from '@expo/vector-icons';
import { fontDisplay } from '../components/styles/StyledText';
import { StatusBar } from 'expo-status-bar';
import packageJson from '../../package.json';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const About: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  const handleUpgrade = (): void => {
    console.log('UPGRADE');
  };
  const handleSuggestions = (): void => {
    console.log('SUGGESTIONS');
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
      <fontDisplay style={styles.title}>About the app</fontDisplay>
      <Text style={styles.versionText}>
        JustForToday app version {getAppVersion()}
      </Text>
      {/* Divider */}
      <View
        style={styles.divider}
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
        style={styles.divider}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
      />
      <Text style={styles.text}>
        All literature is taken with permission from Alcoholics Anonymous World
        Services, Inc.
      </Text>
      <ExternalLink style={styles.helpLink} href='https://www.aa.org/'>
        <Text style={styles.helpLinkText} lightColor={Colours.light.text}>
          AA link
        </Text>
      </ExternalLink>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ForwardedScrollView>
  );
};

const styles = StyleSheet.create({
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
  btn: {
    marginBottom: 10
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
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    textAlign: 'center'
  }
});

export default About;
