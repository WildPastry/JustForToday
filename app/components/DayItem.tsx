import { IDayItem } from '../types/date.types';
import { Pressable } from 'react-native';
import { Text } from './Themed';

const DayItem: React.FC<IDayItem> = (dayItem: IDayItem): JSX.Element => {
  return (
    <Pressable onPress={dayItem.onPress}>
      <Text>{dayItem.name}</Text>
    </Pressable>
  );
};

export default DayItem;
