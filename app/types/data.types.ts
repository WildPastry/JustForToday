import { IMonthItem } from './date.types';

export interface IData {
  dailyReflections: IDailyReflection[];
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
