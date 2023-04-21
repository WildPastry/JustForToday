/* eslint-disable no-unused-vars */
export interface IDate {
  currentDate: number;
  currentDay: string;
  today: string;
}

export enum EDateFormat {
  ddMM = 'ddMM'
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
