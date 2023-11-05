import { IReflection } from '../types/data.types';
import reflections from '../assets/data/reflections.json';

const getReflections: () => IReflection[] = (): IReflection[] => {
  return reflections;
};

export default getReflections;
