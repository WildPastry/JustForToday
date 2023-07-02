import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IDayItem } from '../../types/date.types';
import { AppState } from '../../redux/store';
import { Text } from '../styles/Themed';
import itemStates from '../../constants/itemStates';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';

const DayItem: React.FC<IDayItem> = (props: IDayItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const currentDayTheme = itemStates[`${colorScheme}ActiveItem`];

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
        isCurrentDay() ? currentDayTheme : itemStates[`${colorScheme}Item`]
      ]}
      onPress={props.onPress}>
      {/* Day item */}
      <Text style={[styles.text, isCurrentDay() ? styles.textWhite : null]}>
        {props.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  textWhite: {
    color: '#fff'
  },
  dayItem: {
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 8
  }
});

export default DayItem;
