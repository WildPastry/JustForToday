import { IMonthItems } from '../types/date.types';
import { Pressable } from 'react-native';
import { Text } from './Themed';

const MonthItemWithDays: React.FC<IMonthItems> = (
  props: IMonthItems
): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <Text>{props.id}</Text>
    </Pressable>
  );
};

export default MonthItemWithDays;
