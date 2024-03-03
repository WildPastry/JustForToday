import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { ICalendar, IDayItem, IMonthItem } from '../types/date.types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from './styles/Themed';
import { AntDesign } from '@expo/vector-icons';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import DayItem from './DayItem';
import { FontDisplay } from './styles/StyledText';
import MonthItem from './MonthItem';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';

const Calendar: React.FC<ICalendar> = ({
  handleCalendarChange,
  handleScrollPosition
}: ICalendar): JSX.Element => {
  // Component settings
  const [months, setMonths] = useState<IMonthItem[]>([]);
  const [days, setDays] = useState<IDayItem[]>([]);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

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
    handleScrollPosition();
  };

  const getAllMonths = (): void => {
    setMonths(monthItems);
    setDays([]);
  };

  const renderBackArrow = (): JSX.Element | null => {
    if (days.length) {
      return (
        <Pressable onPress={() => getAllMonths()}>
          <AntDesign
            name='arrowleft'
            size={24}
            color={Colours[colorScheme].icon}
          />
        </Pressable>
      );
    }
    return null;
  };

  return (
    <View>
      <View style={styles.controls}>
        <Pressable style={styles.icon}>{renderBackArrow()}</Pressable>
        <View style={styles.titleContainer}>
          <FontDisplay style={styles.title}>Calendar</FontDisplay>
        </View>
        <View style={styles.icon} />
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
        {days.map((day, index) => (
          <DayItem
            key={index}
            id={day.id}
            name={day.name}
            onPress={() => handleDay(day)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10
  },
  icon: {
    justifyContent: 'center',
    paddingVertical: 10,
    width: '25%'
  },
  titleContainer: {
    justifyContent: 'center',
    paddingVertical: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default Calendar;
