import { DailyReflections } from '../types/data.types';
import dailyReflections from '../assets/data/daily-reflections.json';

const getDailyReflections = (): DailyReflections[] => {
  return dailyReflections;
};

export default getDailyReflections;
