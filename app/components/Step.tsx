import { IStep } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from './styles/Themed';

const StepItem: React.FC<IStep> = (props: IStep): JSX.Element => {
  return (
    // Step
    <Text style={styles.step}>
      <Text style={styles.number}>{props.id}&nbsp;&nbsp;</Text>
      <Text style={styles.text}>{props.step}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  step: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'left'
  },
  number: {
    fontSize: 15,
    fontWeight: '200',
    lineHeight: 21
  }
});

export default StepItem;
