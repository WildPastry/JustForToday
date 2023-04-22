import { Pressable, StyleSheet } from 'react-native';
import { IMonthItem } from '../types/date.types';
import { Text } from './Themed';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  return (
    <Pressable style={styles.btn} onPress={props.onPress}>
      {/* Month item */}
      <Text style={styles.text}>{props.id}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  btn: {
    borderRadius: 7,
    marginBottom: 5,
    paddingHorizontal: 6,
    paddingVertical: 5
  }
});

export default MonthItem;
