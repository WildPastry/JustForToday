import {
  ColorSchemeName,
  ImageBackground,
  Pressable,
  StyleSheet
} from 'react-native';
import { IDate, IMonthItem } from '../../types/date.types';

import { AppState } from '../../redux/store';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from '../styles/Themed';
import itemStates from '../../constants/itemStates';
import { useAppSelector } from '../../redux/hooks';
import useColorScheme from '../../hooks/useColorScheme';
import { FontDisplay } from '../styles/StyledText';

const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const currentMonthTheme = itemStates[`${colorScheme}CurrentItem`];
  const selectedMonthTheme = itemStates[`${colorScheme}SelectedItem`];

  // const combinedMonthTheme: React.FC = (): JSX.Element => {
  //   return (
  //     <ImageBackground
  //       source={require('../../assets/images/button.png')}
  //       resizeMode='cover'>
  //       <FontDisplay style={styles.text}>{props.id}</FontDisplay>
  //     </ImageBackground>
  //   );
  // };

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
    <Pressable style={getMonthTheme()} onPress={props.onPress}>
      {/* Month item */}
      <FontDisplay style={styles.text}>{props.id}</FontDisplay>
    </Pressable>
    // <View>
    //   {combinedMonth() ? (
    //     <View style={styles.combinedTheme}>
    //       <ImageBackground
    //         style={styles.img}
    //         source={require('../../assets/images/button.png')}
    //         resizeMode='cover'
    //         imageStyle={{ borderRadius: 12 }}>
    //         <FontDisplay style={styles.combinedText}>{props.id}</FontDisplay>
    //       </ImageBackground>
    //     </View>
    //   ) : (
    //     <Pressable style={getMonthTheme()} onPress={props.onPress}>
    //       {/* Month item */}
    //       <FontDisplay style={styles.text}>{props.id}</FontDisplay>
    //     </Pressable>
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    textAlign: 'center'
  },
  img: {
    flex: 1
  },
  combinedTheme: {
    marginBottom: 12
  },
  combinedText: {
    color: '#fff',
    paddingVertical: 12,
    textAlign: 'center'
  }
});

export default MonthItem;
