/* eslint-disable no-unused-vars */
export interface IDate {
  currentDate: number;
  currentDay: string;
  today: string;
}

export enum IDateFormat {
  ddMM = 'ddMM'
}

export interface IMonthItems {
  id: string;
  name: string;
  days: IDayItems[];
  onPress: () => void;
}

export interface IDayItems {
  id: string;
  name: string;
  onPress: () => void;
}

export interface ICalendar {
  handleCalendarChange: (showCalendar: boolean, id: string) => void;
}
