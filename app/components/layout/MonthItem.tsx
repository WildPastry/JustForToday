import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IMonthItem } from '../../types/date.types';
import { Text, View } from '../styles/Themed';

import { AppState } from '../../redux/store';
import { MaterialIcons } from '@expo/vector-icons';
import itemStates from '../../constants/itemStates';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const currentMonthTheme = itemStates[`${colorScheme}CurrentItem`];
  const selectedMonthTheme = itemStates[`${colorScheme}SelectedItem`];

  // Data from store
  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  const combinedMonth = (): boolean => {
    return dates.currentMonth === props.id && dates.selectedMonth === props.id;
  };

  // Styles for each month item
  const getMonthTheme = (): {
    borderRadius: number;
    marginBottom: number;
    backgroundColor: string;
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
      marginBottom: 12,
      paddingVertical: 12
    };

    return monthTheme;
  };

  return (
    <View>
      {/* <MaterialIcons name='arrow-back' size={24} color='white' /> */}
      <Pressable style={getMonthTheme()} onPress={props.onPress}>
        {/* Month item */}
        <Text style={styles.text}>{props.id}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default MonthItem;
