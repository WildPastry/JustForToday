import { IMonthItem } from '../types/date.types';
import monthItems from '../assets/data/month-items.json';

const getMonthItems: () => IMonthItem[] = (): IMonthItem[] => {
  return monthItems;
};

export default getMonthItems;
