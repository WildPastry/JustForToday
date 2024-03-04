import { ITradition } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from './styles/Themed';

const TraditionItem: React.FC<ITradition> = (
  props: ITradition
): JSX.Element => {
  return (
    // Tradition
    <Text style={styles.tradtion}>
      <Text style={styles.number}>{props.id}&nbsp;&nbsp;</Text>
      <Text style={styles.text}>{props.tradition}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  tradtion: {
    flexDirection: 'row',
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
    lineHeight: 21,
    marginRight: 10
  }
});

export default TraditionItem;
