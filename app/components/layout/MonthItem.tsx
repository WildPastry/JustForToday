import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IMonthItem } from '../../types/date.types';
import { AppState } from '../../redux/store';
import { Text } from '../styles/Themed';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const currentMonthTheme = styles[`${colorScheme}CurrentMonth`];

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
        isCurrentMonth() ? currentMonthTheme : styles[`${colorScheme}MonthItem`]
      ]}
      onPress={props.onPress}>
      {/* Month item */}
      <Text style={styles.text}>{props.id}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  monthItem: {
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 12
  },
  lightMonthItem: {
    backgroundColor: '#e5edf9'
  },
  darkMonthItem: {
    backgroundColor: '#171b43'
  },
  lightCurrentMonth: {
    borderColor: '#131324',
    borderWidth: 0.5
  },
  darkCurrentMonth: {
    backgroundColor: '#131324'
  }
});

export default MonthItem;
