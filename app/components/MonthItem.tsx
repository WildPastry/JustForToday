import { IMonthItems } from '../types/date.types';
import { Pressable } from 'react-native';
import { Text } from './Themed';

const MonthItem: React.FC<IMonthItems> = (props: IMonthItems): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <Text>
        {props.id}
        {props.name}
        {props.days}
      </Text>
    </Pressable>
  );
};

export default MonthItem;
