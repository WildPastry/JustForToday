import { ICalendar, IDayItem, IMonthItem } from '../../types/date.types';
import { ScrollView, View } from '../styles/Themed';
import { useEffect, useState } from 'react';
import { AppState } from '../../redux/store';
import DayItem from './DayItem';
import { FontDisplay } from '../styles/StyledText';
import MonthItem from './MonthItem';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/hooks';

const Calendar: React.FC<ICalendar> = ({
  handleCalendarChange
}: ICalendar): JSX.Element => {
  // Component settings
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
    setMonths([month]);
    setDays(month.days);
  };

  const handleDay = (day: IDayItem): void => {
    setDays([day]);
    handleCalendarChange(false, day.id);
  };

  return (
    <View>
      <View style={styles.keyContainer}>
        <FontDisplay style={[styles.key, styles.keyCurrent]}>
          TODAY'S DATE
        </FontDisplay>
        <FontDisplay style={[styles.key, styles.keySelected]}>
          SELECTED DATE
        </FontDisplay>
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
    textAlign: 'center',
    width: '30%',
    paddingBottom: 5,
    borderBottomWidth: 15
  },
  keyCurrent: {
    borderBottomColor: '#067b84'
  },
  keySelected: {
    borderBottomColor: '#2c2cb9'
  }
});

export default Calendar;
