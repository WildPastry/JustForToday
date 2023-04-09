import { IDayItems } from '../types/date.types';
import { Pressable } from 'react-native';
import { Text } from './Themed';

const DayItem: React.FC<IDayItems> = (props: IDayItems): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <Text>{props.name}</Text>
    </Pressable>
  );
};

export default DayItem;
