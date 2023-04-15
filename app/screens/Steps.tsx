import { AppState } from '../redux/store';
import Colors from '../constants/Colors';
import { IStep } from '../types/data.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { ScrollView } from '../components/Themed';
import Step from '../components/Step';
import { StyleSheet } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
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
    fontSize: 20
  },
  text: {
    textAlign: 'center'
  }
});

export default Steps;
