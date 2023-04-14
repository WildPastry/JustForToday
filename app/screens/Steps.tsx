import { AppState } from '../redux/store';
import Colors from '../constants/Colors';
import { IStep } from '../types/data.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import Step from '../components/Step';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';

const Steps: React.FC = (): JSX.Element => {
  // Selectors for store
  const steps = useAppSelector((state: AppState): IStep[] => {
    return state.data.steps;
  });

  // Colour settings
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <MaterialCommunityIcons
        style={styles.text}
        name='stairs'
        size={50}
        color={Colors[colorScheme].text}
      />
      {/* Title */}
      <MonoText style={styles.title}>Steps</MonoText>
      {/* Steps */}
      {steps.map((step, index) => (
        <Step key={index} id={step.id} step={step.step} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20
  },
  text: {
    textAlign: 'center'
  }
});

export default Steps;
