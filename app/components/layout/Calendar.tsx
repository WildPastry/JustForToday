import { ICalendar, IDayItem, IMonthItem } from '../../types/date.types';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { ScrollView, Text, View } from '../styles/Themed';
import { setSelectedDay, setSelectedMonth } from '../../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';

import { AppState } from '../../redux/store';
import DayItem from './DayItem';
import { FontDisplay } from '../styles/StyledText';
import { MaterialIcons } from '@expo/vector-icons';
import MonthItem from './MonthItem';

// FLATLIST STUFF
type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '1'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '2'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '3'
  }
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.itemText, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const Calendar: React.FC<ICalendar> = (props: ICalendar): JSX.Element => {
  // FLATLIST STUFF
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
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

<FlatList
        numColumns={3}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable style={styles.backIcon} onPress={() => toggleCalendar()}>
          <MaterialIcons name='arrow-back' size={25} color='white' />
        </Pressable>
        <FontDisplay style={styles.title}>Calendar</FontDisplay>
      </View>
      {/* <Pressable onPress={() => getAllMonths()}>
        <FontDisplay style={styles.all}>ALL MONTHS</FontDisplay>
      </Pressable> */}
      <View style={styles.keyContainer}>
        <View style={[styles.key, styles.keyCurrent]}>
          <FontDisplay style={styles.keyText}>TODAY'S DATE</FontDisplay>
        </View>
        <View style={[styles.key, styles.keySelected]}>
          <FontDisplay style={styles.keyText}>SELECTED DATE</FontDisplay>
        </View>
      </View>

      {/* FLATLIST STUFF */}
      {/* <FlatList
        numColumns={3}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      /> */}

      <ScrollView>
        {months.map((month, index) => (
          <MonthItem
            key={index}
            id={month.id}
            name={month.name}
            days={month.days}
            onPress={() => handleMonth(month)}
          />
        ))}
        <View>
          {days.map((day, index) => (
            <DayItem
              key={index}
              id={day.id}
              name={day.name}
              onPress={() => handleDay(day)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 15
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
