import { IDailyReflection } from '../types/data.types';
import dailyReflections from '../assets/data/daily-reflections.json';

const getDailyReflections = (): IDailyReflection[] => {
  return dailyReflections;
};

export default getDailyReflections;
