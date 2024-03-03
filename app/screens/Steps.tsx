import { ColorSchemeName, StyleSheet } from 'react-native';
import { ForwardedScrollView, View } from '../components/styles/Themed';
import React, { useRef } from 'react';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import { FontDisplay } from '../components/styles/StyledText';
import { IStep } from '../types/data.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Step from '../components/layout/Step';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const Steps: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  // Data from store
  const steps: IStep[] = useAppSelector((state: AppState): IStep[] => {
    return state.data.steps;
  });

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
      <View style={styles.logoContainer}>
        {/* Logo */}
        <MaterialCommunityIcons
          style={styles.icon}
          name='stairs'
          size={25}
          color={Colours[colorScheme].text}
        />
        {/* Title */}
        <FontDisplay style={styles.title}>Steps</FontDisplay>
      </View>
      {/* Divider */}
      <View
        style={styles.divider}
        lightColor={Colours.light.seperator}
        darkColor={Colours.dark.seperator}
      />
      {/* Steps */}
      {steps.map((step, index) => (
        <Step key={index} id={step.id} step={step.step} />
      ))}
    </ForwardedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  title: {
    fontSize: 20,
    marginLeft: 10
  },
  icon: {
    textAlign: 'center'
  },
  divider: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '70%'
  }
});

export default Steps;
