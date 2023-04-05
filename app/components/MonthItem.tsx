import { Text, View } from './Themed';
import { MonthItems } from '../types/date.types';

const MonthItem: React.FC<MonthItems> = (props: MonthItems): JSX.Element => {
  return (
    <View>
      <Text>
        {props.id}
        {props.name}
        {props.days}
      </Text>
    </View>
  );
};

export default MonthItem;
