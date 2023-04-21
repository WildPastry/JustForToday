import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IDayItem } from '../types/date.types';
import { AppState } from '../redux/store';
import { Text } from './Themed';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';

const DayItem: React.FC<IDayItem> = (props: IDayItem): JSX.Element => {
  // Selectors for store
  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const dayItemTheme = styles[`${colorScheme}DayItemToday`];

  return (
    <Pressable
      style={[
        styles.dayItem,
        dates.today === props.id ? dayItemTheme : styles.dayItemDefault
      ]}
      onPress={props.onPress}>
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
    marginBottom: 5,
    paddingHorizontal: 7,
    paddingVertical: 5
  },
  lightDayItemToday: {
    borderColor: '#131324',
    borderWidth: 0.5
  },
  darkDayItemToday: {
    backgroundColor: '#131324'
  },
  dayItemDefault: {
    backgroundColor: 'transparent'
  }
});

export default DayItem;
