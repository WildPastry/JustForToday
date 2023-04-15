import { IDate, IDayItem } from '../types/date.types';
import { Pressable, StyleSheet } from 'react-native';
import { AppState } from '../redux/store';
import { Text } from './Themed';
import { useAppSelector } from '../redux/hooks';

const DayItem: React.FC<IDayItem> = (dayItem: IDayItem): JSX.Element => {
  // Selectors for store
  const dates = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  return (
    <Pressable
      style={[
        styles.dayItem,
        dates.today === dayItem.id ? styles.dayItemToday : styles.dayItemDefault
      ]}
      onPress={dayItem.onPress}>
      <Text style={styles.text}>{dayItem.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  dayItem: {
    borderRadius: 3,
    marginBottom: 5,
    padding: 3
  },
  dayItemToday: {
    backgroundColor: 'blue'
  },
  dayItemDefault: {
    backgroundColor: 'transparent'
  }
});

export default DayItem;
