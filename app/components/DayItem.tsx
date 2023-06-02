import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IDayItem } from '../types/date.types';
import { AppState } from '../redux/store';
import { Text } from './Themed';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';

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
      <Text style={styles.text}>{props.name}</Text>
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
    borderColor: '#131324',
    borderWidth: 0.5
  },
  darkCurrentDay: {
    backgroundColor: '#131324'
  }
});

export default DayItem;
