import { IMonthItem } from './date.types';

export interface IData {
  dailyReflections: IDailyReflection[];
  steps: IStep[];
  traditions: ITraditions;
  monthItems: IMonthItem[];
  loading: boolean;
  error: boolean;
}

export interface IDailyReflection {
  id: string;
  date: string;
  title: string;
  quote: string;
  source: string;
  dailyReflection: string;
}

export interface IStep {
  id: string;
  step: string;
}

export interface ITraditions {
  short: ITraditionItem[];
  long: ITraditionItem[];
}

export interface ITraditionItem {
  id: string;
  tradition: string;
}
