import { ColorSchemeName, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { IDate, IDayItem } from '../../types/date.types';

import { AppState } from '../../redux/store';
import { Text } from '../styles/Themed';
import itemStates from '../../constants/itemStates';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';
import { useEffect } from 'react';

const DayItem: React.FC<IDayItem> = (props: IDayItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const currentDayTheme = itemStates[`${colorScheme}CurrentItem`];

  // Data from store
  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  const combinedDay = (): boolean => {
    return dates.currentDay === props.id && dates.selectedDay === props.id;
  };

  // Styles for each day item
  const getDayTheme = (): {
    borderRadius: number;
    marginBottom: number;
    backgroundColor: string;
  } => {
    let currentBg: string = '#131324';
    if (combinedDay()) {
      console.log('combined day');
    }
    else if (dates.currentDay === props.id) {
      currentBg = '#067b84';
    } else if (dates.selectedDay === props.id) {
      currentBg = '#2c2cb9';
    }

    const dayTheme = {
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: currentBg
    };

    return dayTheme;
  };

  return (
    <Pressable style={getDayTheme()} onPress={props.onPress}>
      {/* <ImageBackground source={require('../../assets/images/button.png')} resizeMode="cover">
      <Text style={styles.text}>{props.name}</Text>

    </ImageBackground> */}
      {/* Day item */}
      <Text style={styles.text}>{props.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 8
  }
});

export default DayItem;
