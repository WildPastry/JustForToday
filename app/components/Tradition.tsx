import { ITradition } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from './Themed';

const TraditionItem: React.FC<ITradition> = (
  tradtion: ITradition
): JSX.Element => {
  return (
    // Tradition
    <Text style={styles.text}>
      #{tradtion.id}: {tradtion.tradition}
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
