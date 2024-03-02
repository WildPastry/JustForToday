import { IStep } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from '../styles/Themed';

const StepItem: React.FC<IStep> = (props: IStep): JSX.Element => {
  return (
    // Step
    <Text style={styles.text}>
      <Text style={styles.textBold}>{props.id}</Text> {props.step}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    lineHeight: 25,
    marginBottom: 20
  },
  textBold: {
    fontWeight: 'bold'
  }
});

export default StepItem;
