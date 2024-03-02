import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IDayItem } from '../../types/date.types';
import { AppState } from '../../redux/store';
import { Text } from '../styles/Themed';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';

const DayItem: React.FC<IDayItem> = (props: IDayItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const currentDayTheme = styles[`${colorScheme}CurrentDay`];

  // Data from store
  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  const isCurrentDay = (): boolean => {
    return dates.currentDay === props.id;
  };

  return (
    <Pressable
      style={[
        styles.dayItem,
        isCurrentDay() ? currentDayTheme : styles[`${colorScheme}DayItem`]
      ]}
      onPress={props.onPress}>
      {/* Day item */}
      <Text
        style={[
          styles.text,
          isCurrentDay() ? styles.currentDayItemText : null
        ]}>
        {props.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  dayItem: {
    borderRadius: 7,
    marginBottom: 8,
    paddingHorizontal: 6,
    paddingVertical: 5
  },
  lightDayItem: {
    backgroundColor: '#e5edf9'
  },
  darkDayItem: {
    backgroundColor: '#171b43'
  },
  lightCurrentDay: {
    backgroundColor: '#0074c1'
  },
  darkCurrentDay: {
    backgroundColor: '#0074c1'
  },
  currentDayItemText: {
    color: '#fff'
  }
});

export default DayItem;
