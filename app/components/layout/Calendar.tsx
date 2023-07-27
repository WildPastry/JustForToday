import { FlatList, Pressable, StyleSheet } from 'react-native';
import { ICalendar, IDayItem, IMonthItem } from '../../types/date.types';
import { setSelectedDay, setSelectedMonth } from '../../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';

import { AppState } from '../../redux/store';
import DayItem from './DayItem';
import { FontDisplay } from '../styles/StyledText';
import { MaterialIcons } from '@expo/vector-icons';
import MonthItem from './MonthItem';
import { View } from '../styles/Themed';

const Calendar: React.FC<ICalendar> = (props: ICalendar): JSX.Element => {
  // Set up list render functions
  const renderMonth = ({ item }: { item: IMonthItem }) => {
    const { id, name, days } = item;
    return (
      <MonthItem
        id={id}
        name={name}
        days={days}
        onPress={() => handleMonth(item)}
      />
    );
  };

  const renderDay = ({ item }: { item: IDayItem }) => {
    const { id, name } = item;
    return <DayItem id={id} name={name} onPress={() => handleDay(item)} />;
  };

  // Component settings
  const dispatch = useAppDispatch();
  const [months, setMonths] = useState<IMonthItem[]>([]);
  const [days, setDays] = useState<IDayItem[]>([]);

  // Data from store
  const monthItems: IMonthItem[] = useAppSelector(
    (state: AppState): IMonthItem[] => {
      return state.data.monthItems;
    }
  );

  useEffect(() => {
    setMonths(monthItems);
  }, [monthItems]);

  const getAllMonths = (): void => {
    setMonths(monthItems);
    setDays([]);
  };

  const handleMonth = (month: IMonthItem): void => {
    dispatch(setSelectedMonth(month.id));
    setMonths([month]);
    setDays(month.days);
  };

  const handleDay = (day: IDayItem): void => {
    dispatch(setSelectedDay(day.id));
    setDays([day]);
    props.handleCalendarChange(false, day.id);
  };

  const toggleCalendar = (): void => {
    props.handleCalendarState(false);
  };

  return (
    <View style={styles.container}>
      {/* Controls */}
      <View style={styles.controls}>
        <Pressable style={styles.backIcon} onPress={() => toggleCalendar()}>
          <MaterialIcons name='arrow-back' size={25} color='white' />
        </Pressable>
        <FontDisplay style={styles.title}>Calendar</FontDisplay>
      </View>
      <View style={styles.keyContainer}>
        <View style={[styles.key, styles.keyCurrent]}>
          <FontDisplay style={styles.keyText}>TODAY'S DATE</FontDisplay>
        </View>
        <View style={[styles.key, styles.keySelected]}>
          <FontDisplay style={styles.keyText}>SELECTED DATE</FontDisplay>
        </View>
      </View>
      <Pressable onPress={() => getAllMonths()}>
        <FontDisplay style={styles.all}>ALL MONTHS</FontDisplay>
      </Pressable>
      {/* Months */}
      <FlatList
        numColumns={3}
        data={months}
        renderItem={renderMonth}
        keyExtractor={(month) => month.id}
      />
      {/* Days */}
      <FlatList
        numColumns={7}
        data={days}
        renderItem={renderDay}
        keyExtractor={(day) => day.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  all: {
    fontSize: 15
  },
  item: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    width: '30%'
  },
  itemText: {
    textAlign: 'center'
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 15
  },
  title: {
    fontSize: 30,
    flex: 1,
    letterSpacing: 1,
    textAlign: 'center',
    paddingRight: 25
  },
  keyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  backIcon: {
    width: 25
  },
  key: {
    width: '30%',
    paddingBottom: 5,
    borderStyle: 'solid',
    borderBottomWidth: 15
  },
  keyText: {
    textAlign: 'center'
  },
  keyCurrent: {
    borderBottomColor: '#067b84'
  },
  keySelected: {
    borderBottomColor: '#2c2cb9'
  }
});

export default Calendar;
