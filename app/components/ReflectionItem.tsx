import { Text, View } from '../components/Themed';
import { DailyReflectionItem } from '../types/data.types';

const ReflectionItem: React.FC<DailyReflectionItem> = (
  props: DailyReflectionItem
): JSX.Element => {
  return (
    <View>
      <Text>{props.id}</Text>
    </View>
  );
};

export default ReflectionItem;
