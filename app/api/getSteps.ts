import { IStep } from '../types/data.types';
import steps from '../assets/data/steps.json';

const getSteps = (): IStep[] => {
  return steps;
};

export default getSteps;
