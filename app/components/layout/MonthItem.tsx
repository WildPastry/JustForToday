import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IMonthItem } from '../../types/date.types';
import { useEffect, useState } from 'react';
import { AppState } from '../../redux/store';
import { Text } from '../styles/Themed';
import itemStates from '../../constants/itemStates';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';
import { EItemStates } from '../../types/generic.types';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  // const [monthTheme, setMonthTheme] = useState(EItemStates.ITEM);
  const currentMonthTheme = itemStates[`${colorScheme}CurrentItem`];
  const selectedMonthTheme = itemStates[`${colorScheme}SelectedItem`];

  // Data from store
  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // useEffect(() => {
  //   setMonthTheme(EItemStates.ITEM);
  // }, []);

  // const checkMonth = (): string | undefined => {
  //   if (dates.currentMonth === props.id) {
  //     return EItemStates.CURRENT
  //   } if (dates.selectedMonth === props.id) {
  //     return EItemStates.SELECTED
  //   }
  //   return undefined
  // };

  // const getMonthTheme = (): any => {
  //   return 'styles.monthItem';
  // };

  const getMonthTheme = (): {
    borderRadius: number;
    marginBottom: number;
    paddingVertical: number;
    backgroundColor: string;
} => {
    let currentBg: string = '#131324';
     if (dates.currentMonth === props.id) {
      currentBg = '#067b84';
     } else if (dates.selectedMonth === props.id) {
      currentBg = '#2c2cb9';
     }

    let styles = {    borderRadius: 12,
      marginBottom: 12,
      paddingVertical: 12,
      backgroundColor: currentBg }

    // if (this.state.first === 'first'){
    //     const firstStyle = {
    //        ...
    //     }
    //     styles = Object.assign(styles,firstStyle)
    // }
    // if (this.state.second === 'second'){
    //     const secondStyle = {
    //         ...
    //     }
    //     styles = Object.assign(styles,secondStyle)
    // }
    // if (this.state.third === 'third'){
    //     const thirdStyle = {
    //         ...
    //     }
    //     styles = Object.assign(styles,thirdStyle)
    // }
    return styles;
}

  return (
    <Pressable style={[getMonthTheme()]} onPress={props.onPress}>
      {/* Month item */}
      <Text style={[styles.text]}>
        {props.id}
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
  monthItem: {
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 12
  }
});

export default MonthItem;
