import { ITraditions } from '../types/data.types';
import twelveTraditions from '../assets/data/twelve-traditions.json';

const getTwelveTraditions = (): ITraditions => {
  return twelveTraditions;
};

export default getTwelveTraditions;
