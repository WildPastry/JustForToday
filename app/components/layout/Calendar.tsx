import { ICalendar, IDayItem, IMonthItem } from '../../types/date.types';
import { ScrollView, View } from '../styles/Themed';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';
import { AppState } from '../../redux/store';
import DayItem from './DayItem';
import { FontDisplay } from '../styles/StyledText';
import MonthItem from './MonthItem';
import { StyleSheet } from 'react-native';
import { setSelectedDay, setSelectedMonth } from '../../redux/slices/dateSlice';

const Calendar: React.FC<ICalendar> = ({
  handleCalendarChange
}: ICalendar): JSX.Element => {
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
    handleCalendarChange(false, day.id);
  };

  return (
    <View>
      <View style={styles.keyContainer}>
        <View style={[styles.key, styles.keyCurrent]}>
          <FontDisplay style={styles.keyText}>TODAY'S DATE</FontDisplay>
        </View>
        <View style={[styles.key, styles.keySelected]}>
          <FontDisplay style={styles.keyText}>SELECTED DATE</FontDisplay>
        </View>
      </View>
      <ScrollView>
        {/* Months */}
        {months.map((month, index) => (
          <MonthItem
            key={index}
            id={month.id}
            name={month.name}
            days={month.days}
            onPress={() => handleMonth(month)}
          />
        ))}
        {/* Days */}
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
  keyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
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
