import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { ICalendar, IDayItem, IMonthItem } from '../types/date.types';
import React, { useEffect, useState } from 'react';
import { Text, View } from './styles/Themed';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { AntDesign } from '@expo/vector-icons';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import Control from '../constants/Control';
import DayItem from './DayItem';
import { IDeviceSize } from '../types/generic.types';
import MonthItem from './MonthItem';
import getDeviceSize from '../constants/Layout';
import { resetCalendar } from '../redux/slices/dateSlice';
import useColorScheme from '../hooks/useColorScheme';

const Calendar: React.FC<ICalendar> = ({
  handleCalendarChange,
  handleScrollPosition
}: ICalendar): JSX.Element => {
  // Component settings
  const [months, setMonths] = useState<IMonthItem[]>([]);
  const [days, setDays] = useState<IDayItem[]>([]);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();
  const dispatch = useAppDispatch();

  // Data from store
  const monthItems: IMonthItem[] = useAppSelector(
    (state: AppState): IMonthItem[] => {
      return state.data.monthItems;
    }
  );

  const currentDay: string = useAppSelector((state: AppState): string => {
    return state.date.currentDay;
  });

  useEffect(() => {
    setMonths(monthItems);
  }, [monthItems]);

  // Calendar functions
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

  const handleReset = (currentDay: string): void => {
    dispatch(resetCalendar());
    handleCalendarChange(false, currentDay);
    handleScrollPosition();
  };

  const getAllMonths = (): void => {
    setMonths(monthItems);
    setDays([]);
  };

  const isSingleMonth = (): boolean => {
    return days.length > 0;
  };

  const renderBackArrow = (): JSX.Element | null => {
    if (days.length) {
      return (
        <Pressable onPress={() => getAllMonths()}>
          <AntDesign
            name='arrowleft'
            size={Control[deviceSize].icon}
            color={Colours[colorScheme].icon}
          />
        </Pressable>
      );
    }
    return null;
  };

  return (
    <View>
      <View style={[styles.controls, Control[deviceSize].controls]}>
        <Pressable style={styles.icon}>{renderBackArrow()}</Pressable>
        <Pressable onPress={() => handleReset(currentDay)}>
          <Text
            style={Control[deviceSize].subTitle}
            lightColor={Colours.light.link}
            darkColor={Colours.dark.link}>
            TODAY
          </Text>
        </Pressable>
        <View style={styles.icon} />
      </View>
      <View style={[styles.calendarItems, Control[deviceSize].months]}>
        {/* Months */}
        {months.map((month) => (
          <MonthItem
            key={month.id}
            id={month.id}
            name={month.name}
            days={month.days}
            single={isSingleMonth()}
            onPress={() => handleMonth(month)}
          />
        ))}
      </View>
      <View style={styles.daysWrapper}>
        <View style={[styles.calendarItems, Control[deviceSize].days]}>
          {/* Days */}
          {days.map((day) => (
            <DayItem
              key={day.id}
              id={day.id}
              name={day.name}
              onPress={() => handleDay(day)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  calendarItems: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  daysWrapper: {
    marginBottom: 20,
    marginTop: 30
  },
  icon: {
    justifyContent: 'center',
    width: '25%'
  }
});

export default Calendar;
