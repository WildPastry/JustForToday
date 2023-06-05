import { ColorSchemeName, StyleSheet } from 'react-native';
import ForwardedScrollView, { View } from '../components/styles/Themed';
import React, { useRef } from 'react';
import { AppState } from '../redux/store';
import Colours from '../constants/colours';
import { FontBold } from '../components/styles/StyledText';
import { IStep } from '../types/data.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Step from '../components/layout/Step';
import globlStyles from './../constants/styles';
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
          name='stairs'
          size={25}
          color={Colours[colorScheme].text}
        />
        {/* Title */}
        <FontBold style={globlStyles.titleWithIcon}>STEPS</FontBold>
      </View>
      {/* Divider */}
      <View
        style={globlStyles.divider}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
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
  }
});

export default Steps;
