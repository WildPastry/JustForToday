import { IMonthItem } from '../types/date.types';
import { Pressable } from 'react-native';
import { Text } from './Themed';

const MonthItem: React.FC<IMonthItem> = (
  monthItem: IMonthItem
): JSX.Element => {
  return (
    <Pressable onPress={monthItem.onPress}>
      <Text>{monthItem.id}</Text>
    </Pressable>
  );
};

export default MonthItem;
