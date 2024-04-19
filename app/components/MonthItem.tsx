import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IMonthItem } from '../types/date.types';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import { Text } from './styles/Themed';
import getDeviceSize from '../constants/Layout';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

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
        Control[deviceSize].monthItem,
        props.single ? styles.singleMonthItem : styles.allMonthItems,
        isCurrentMonth()
          ? { backgroundColor: Colours[colorScheme].currentBtn }
          : { backgroundColor: Colours[colorScheme].btn }
      ]}
      onPress={props.onPress}>
      <Text
        style={[
          styles.text,
          Control[deviceSize].text,
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
    textAlign: 'center'
  },
  monthItem: {
    borderRadius: 12
  },
  singleMonthItem: {
    width: '100%'
  },
  allMonthItems: {
    flexGrow: 1,
    width: '25%'
  }
});

export default MonthItem;
