/* eslint-disable no-unused-vars */
export enum IMonthNames {
  January,
  Feburary,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
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

export interface IDate {
  currentDay: string;
  today: string;
}

export interface ICalendar {
  handleCalendarChange: (showCalendar: boolean, id: string) => void;
}
