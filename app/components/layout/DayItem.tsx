import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IDayItem } from '../../types/date.types';
import { AppState } from '../../redux/store';
import Colours from '../../constants/Colours';
import { Text } from '../styles/Themed';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';

const DayItem: React.FC<IDayItem> = (props: IDayItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

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
        isCurrentDay()
          ? { backgroundColor: Colours[colorScheme].currentBtn }
          : { backgroundColor: Colours[colorScheme].btn }
      ]}
      onPress={props.onPress}>
      <Text
        style={[
          styles.text,
          isCurrentDay() ? { color: Colours[colorScheme].currentBtnText } : null
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
    marginBottom: 15,
    paddingVertical: 10
  }
});

export default DayItem;
