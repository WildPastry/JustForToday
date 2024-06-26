/* eslint-disable no-unused-vars */
export interface IDate {
  selectedDate: number;
  selectedDay: string;
  currentMonth: string;
  currentDay: string;
}

export enum EDateFormat {
  ddMM = 'ddMM',
  MMM = 'MMM'
}

export interface IMonthItem {
  id: string;
  name: string;
  days: IDayItem[];
  single: boolean;
  onPress?: () => void;
}

export interface IDayItem {
  id: string;
  name: string;
  onPress?: () => void;
}

export interface ICalendar {
  handleCalendarChange: (showCalendar: boolean, id: string) => void;
  handleScrollPosition: () => void;
}
