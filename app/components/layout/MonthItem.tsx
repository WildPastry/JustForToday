import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IMonthItem } from '../../types/date.types';
import { AppState } from '../../redux/store';
import { Text } from '../styles/Themed';
import itemStates from '../../constants/itemStates';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';

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
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: currentBg
    };

    return monthTheme;
  };

  return (
    <Pressable style={getMonthTheme()} onPress={props.onPress}>
      {/* Month item */}
      {combinedMonth() ? (
        <LinearGradient
          colors={['#067b84', '#2c2cb9']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}>
          <Text style={styles.text}>{props.id}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.text}>{props.id}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12
  },
  gradient: {
    borderRadius: 12
  }
});

export default MonthItem;
