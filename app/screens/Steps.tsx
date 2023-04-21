import { ColorSchemeName, StyleSheet } from 'react-native';
import ForwardedScrollView, { View } from '../components/Themed';
import { useEffect, useRef } from 'react';
import { AppState } from '../redux/store';
import Colors from '../constants/Colors';
import { IStep } from '../types/data.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import Step from '../components/Step';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';
import { useIsFocused } from '@react-navigation/native';

const Steps: React.FC = (): JSX.Element => {
  // Create ref for functional scroll view
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);

  // Set up isFocused hook for tracking component
  const isFocused: boolean = useIsFocused();

  // Selectors for store
  const steps: IStep[] = useAppSelector((state: AppState): IStep[] => {
    return state.data.steps;
  });

  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  useEffect(() => {
    if (isFocused) {
      // Re-render component when focused to reset scroll view
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [isFocused]);

  return (
    <ForwardedScrollView
      contentContainerStyle={styles.container}
      ref={scrollViewRef}>
      {/* Logo */}
      <MaterialCommunityIcons
        style={styles.icon}
        name='stairs'
        size={50}
        color={Colors[colorScheme].text}
      />
      {/* Title */}
      <MonoText style={styles.title}>Steps</MonoText>
      {/* Divider */}
      <View
        style={styles.separator}
        lightColor={Colors[colorScheme].seperator}
        darkColor={Colors[colorScheme].seperator}
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
    padding: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  icon: {
    textAlign: 'center'
  },
  separator: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '80%'
  }
});

export default Steps;
