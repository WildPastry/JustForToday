import { ITraditions } from '../types/data.types';
import traditions from '../assets/data/traditions.json';

const getTraditions = (): ITraditions => {
  return traditions;
};

export default getTraditions;
