import { IStep } from '../types/data.types';
import twelveSteps from '../assets/data/twelve-steps.json';

const getTwelveSteps = (): IStep[] => {
  return twelveSteps;
};

export default getTwelveSteps;
