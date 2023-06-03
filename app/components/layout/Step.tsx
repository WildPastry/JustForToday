import { IStep } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from '../styles/Themed';

const StepItem: React.FC<IStep> = (props: IStep): JSX.Element => {
  return (
    // Step
    <Text style={styles.text}>
      #{props.id}: {props.step}
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
