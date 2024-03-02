import { ITradition } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from '../styles/Themed';

const TraditionItem: React.FC<ITradition> = (
  props: ITradition
): JSX.Element => {
  return (
    // Tradition
    <Text style={styles.text}>
      <Text style={styles.textBold}>{props.id}</Text> {props.tradition}
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

export default TraditionItem;
