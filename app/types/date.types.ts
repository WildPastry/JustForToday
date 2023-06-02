/* eslint-disable no-unused-vars */
export interface IDate {
  currentDate: number;
  currentMonth: string;
  currentDay: string;
  today: string;
}

export enum EDateFormat {
  ddMM = 'ddMM',
  MMM = 'MMM'
}

export interface IMonthItem {
  id: string;
  name: string;
  days: IDayItem[];
  onPress?: () => void;
}

export interface IDayItem {
  id: string;
  name: string;
  onPress?: () => void;
}

export interface ICalendar {
  handleCalendarChange: (showCalendar: boolean, id: string) => void;
}
