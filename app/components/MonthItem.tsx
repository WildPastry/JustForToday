import { IMonthItem } from '../types/date.types';
import { Pressable } from 'react-native';
import { Text } from './Themed';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <Text>{props.id}</Text>
    </Pressable>
  );
};

export default MonthItem;
