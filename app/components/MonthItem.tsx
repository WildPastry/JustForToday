import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { IMonthItem } from '../types/date.types';
import { Text } from './Themed';
import useColorScheme from '../hooks/useColorScheme';
const MonthItem: React.FC<IMonthItem> = (props: IMonthItem): JSX.Element => {
  // Component settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  return (
    <Pressable
      style={[styles.monthItem, styles[`${colorScheme}MonthItem`]]}
      onPress={props.onPress}>
      {/* Month item */}
      <Text style={styles.text}>{props.id}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  monthItem: {
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 12
  },
  lightMonthItem: {
    backgroundColor: '#e6e6f9'
  },
  darkMonthItem: {
    backgroundColor: '#131324'
  }
});

export default MonthItem;
