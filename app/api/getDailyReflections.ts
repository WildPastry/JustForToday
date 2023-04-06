import { IDailyReflections } from '../types/data.types';
import dailyReflections from '../assets/data/daily-reflections.json';

const getDailyReflections = (): IDailyReflections[] => {
  return dailyReflections;
};

export default getDailyReflections;
