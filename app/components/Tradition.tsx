import { ITradition } from '../types/data.types';
import { Text } from './Themed';

const TraditionItem: React.FC<ITradition> = (
  tradtion: ITradition
): JSX.Element => {
  return (
    // Tradition
    <Text>
      #{tradtion.id}: {tradtion.tradition}
    </Text>
  );
};

export default TraditionItem;
