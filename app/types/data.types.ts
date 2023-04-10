import { IMonthItems } from './date.types';

export interface IDailyReflections {
  id: string;
  date: string;
  title: string;
  quote: string;
  source: string;
  dailyReflection: string;
}

export interface IData {
  dailyReflections: IDailyReflections[];
  monthItems: IMonthItems[];
  loading: boolean;
  error: boolean;
}
