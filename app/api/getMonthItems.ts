import { MonthItems } from '../types/date.types';
import monthItems from '../assets/data/month-items.json';

const getMonthItems = (): MonthItems[] => {
  return monthItems;
};

export default getMonthItems;
