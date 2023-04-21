import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IDate, IDayItem } from '../types/date.types';
import { AppState } from '../redux/store';
import { Text } from './Themed';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';

const DayItem: React.FC<IDayItem> = (props: IDayItem): JSX.Element => {
  // Selectors for store
  const dates = useAppSelector((state: AppState): IDate => {
    return state.date;
  });
  const color = 'red';
  const textStyle = styles[`${color}Text`];
  // Colour settings
  // const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  return (
    <Text style={textStyle}>Hello, world!</Text>
    // <Pressable
    //   style={[
    //     styles.dayItem,
    //     dates.today === props.id ? styles.dayItemToday : styles.dayItemDefault
    //   ]}
    //   onPress={props.onPress}>
    //   <Text style={styles.text}>{props.name}</Text>
    // </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  redText: {
    color: 'red',
  },
  blueText: {
    color: 'blue',
  },
});

// const styles = StyleSheet.create({
//   text: {
//     textAlign: 'center'
//   },
//   dayItem: {
//     borderRadius: 3,
//     marginBottom: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5
//   },
//   dayItemToday: {
//     backgroundColor: '#131324'
//   },
//   dayItemDefault: {
//     backgroundColor: 'transparent'
//   }
// });

export default DayItem;
