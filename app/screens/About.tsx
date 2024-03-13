/* eslint-disable max-len */
import { ColorSchemeName, Linking, Pressable, StyleSheet } from 'react-native';
import { ForwardedScrollView, Text, View } from '../components/styles/Themed';
import React, { useRef } from 'react';
import Colours from '../constants/Colours';
import { FontAwesome } from '@expo/vector-icons';
import { FontDisplay } from '../components/styles/StyledText';
import Fonts from '../constants/Fonts';
import { IDeviceSize } from '../types/generic.types';
import getDeviceSize from '../constants/Layout';
import packageJson from '../../package.json';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const About: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

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
      contentContainerStyle={Fonts[deviceSize].container}
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
        lightColor={Colours.light.seperator}
        darkColor={Colours.dark.seperator}
      />
      {/* Information */}
      <Text style={styles.text}>
        Daily reflections, steps, and traditions with zero advertisements.
      </Text>
      <Text style={styles.text}>
        Created to give people in the fellowship fast access to well known AA
        literature at the touch of a button.
      </Text>
      {/* Suggestions */}
      <Text style={styles.subTitle}>Suggestions?</Text>
      <Text style={styles.text}>
        If you have any suggestions or requests for features to improve the app
        you can send them using the button below.
      </Text>
      {/* Suggestions Btn */}
      <Pressable
        style={[
          styles.helpLinkBtn,
          { backgroundColor: Colours[colorScheme].btn }
        ]}
        onPress={() => handleSuggestions()}>
        <Text style={styles.textCenter}>Send email</Text>
      </Pressable>
      {/* Divider */}
      <View
        style={styles.divider}
        lightColor={Colours.light.seperator}
        darkColor={Colours.dark.seperator}
      />
      {/* AA disclaimer and link*/}
      <Text style={[styles.text, styles.textCenter]}>
        All literature is taken with permission from{' '}
        <Text
          onPress={() => handleLink()}
          lightColor={Colours.light.link}
          darkColor={Colours.dark.link}>
          Alcoholics Anonymous World Services, Inc.
        </Text>
      </Text>
    </ForwardedScrollView>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'left'
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 20
  },
  versionText: {
    fontSize: 15,
    fontWeight: '200',
    lineHeight: 20,
    textAlign: 'center'
  },
  icon: {
    marginBottom: 10,
    textAlign: 'center'
  },
  divider: {
    alignSelf: 'center',
    height: 1,
    marginVertical: 20,
    width: '70%'
  },
  helpLinkBtn: {
    borderRadius: 12,
    marginVertical: 15,
    paddingVertical: 12
  }
});

export default About;
