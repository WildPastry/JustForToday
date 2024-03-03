import { ICalendar, IDayItem, IMonthItem } from '../types/date.types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from './styles/Themed';
import { AppState } from '../redux/store';
import DayItem from './DayItem';
import { FontDisplay } from './styles/StyledText';
import MonthItem from './MonthItem';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';

const Calendar: React.FC<ICalendar> = ({
  handleCalendarChange,
  handleScrollPosition
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

  const handleMonth = (month: IMonthItem): void => {
    setMonths([month]);
    setDays(month.days);
    handleScrollPosition();
  };

  const handleDay = (day: IDayItem): void => {
    setDays([day]);
    handleCalendarChange(false, day.id);
  };

  return (
    <View>
      <FontDisplay style={styles.title}>Calendar</FontDisplay>
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
        <View style={styles.dayView}>
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
  text: {
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 10,
    textAlign: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center'
  },
  dayView: {
    flex: 3
  }
});

export default Calendar;
