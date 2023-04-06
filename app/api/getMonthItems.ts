import { IMonthItems } from '../types/date.types';
import monthItems from '../assets/data/month-items.json';

const getMonthItems = (): IMonthItems[] => {
  return monthItems;
};

export default getMonthItems;
