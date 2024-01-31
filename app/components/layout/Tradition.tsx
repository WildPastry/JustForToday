import { ITradition } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from '../styles/Themed';

const TraditionItem: React.FC<ITradition> = (
  props: ITradition
): JSX.Element => {
  return (
    // Tradition
    <Text style={styles.text}>
      #{props.id}: {props.tradition}
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

export default TraditionItem;
