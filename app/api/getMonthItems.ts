import { MonthItems } from '../types/date.types';
import monthItems from '../assets/data/months.json';

const getMonthItems = (): MonthItems[] => {
  return monthItems;
};

export default getMonthItems;
