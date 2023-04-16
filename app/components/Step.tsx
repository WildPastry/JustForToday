import { IStep } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from './Themed';

const StepItem: React.FC<IStep> = (step: IStep): JSX.Element => {
  return (
    // Step
    <Text style={styles.text}>
      #{step.id}: {step.step}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 10
  }
});

export default StepItem;
