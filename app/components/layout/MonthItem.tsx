import { IDate, IMonthItem } from '../../types/date.types';
import { Pressable, StyleSheet } from 'react-native';

import { AppState } from '../../redux/store';
import { FontDisplay } from '../styles/StyledText';
import { useAppSelector } from '../../redux/hooks';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Data from store
  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // Styles for each month item
  const getMonthTheme = (): {
    backgroundColor: string;
    borderRadius: number;
    paddingVertical: number;
  } => {
    let currentBg: string = '#131324';
    if (dates.currentMonth === props.id) {
      currentBg = '#067b84';
    } else if (dates.selectedMonth === props.id) {
      currentBg = '#2c2cb9';
    }

    const monthTheme = {
      backgroundColor: currentBg,
      borderRadius: 12,
      paddingVertical: 24
    };

    return monthTheme;
  };

  return (
    <Pressable style={getMonthTheme()} onPress={props.onPress}>
      {/* Month item */}
      <FontDisplay style={styles.text}>{props.id}</FontDisplay>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center'
  },
  img: {
    flex: 1
  }
});

export default MonthItem;
