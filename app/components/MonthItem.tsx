import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IMonthItem } from '../types/date.types';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import { Text } from './styles/Themed';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  // Data from store
  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  const isCurrentMonth = (): boolean => {
    return dates.currentMonth === props.id;
  };

  return (
    <Pressable
      style={[
        styles.monthItem,
        isCurrentMonth()
          ? { backgroundColor: Colours[colorScheme].currentBtn }
          : { backgroundColor: Colours[colorScheme].btn }
      ]}
      onPress={props.onPress}>
      <Text
        style={[
          styles.text,
          isCurrentMonth()
            ? { color: Colours[colorScheme].currentBtnText }
            : null
        ]}>
        {props.id}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center'
  },
  monthItem: {
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 20
  }
});

export default MonthItem;
