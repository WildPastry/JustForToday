import { DailyReflection } from '../types/data.types';
import dailyReflections from '../assets/data/daily-reflections.json';

const getDailyReflections = (): DailyReflection[] => {
  return dailyReflections;
};

export default getDailyReflections;
