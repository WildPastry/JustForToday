/* eslint-disable no-unused-vars */
import { IMonthItem } from './date.types';

export interface IData {
  reflections: IReflection[];
  steps: IStep[];
  traditions: ITraditions;
  monthItems: IMonthItem[];
  loading: boolean;
  error: boolean;
}

export interface IReflection {
  id: string;
  date: string;
  title: string;
  quote: string;
  source: string;
  reflection: string;
}

export interface IReflectionComponent {
  handleScrollTop: () => void;
}

export interface IStep {
  id: string;
  step: string;
}

export interface ITraditions {
  short: ITradition[];
  long: ITradition[];
}

export interface ITradition {
  id: string;
  tradition: string;
}

export enum ETraditionTypes {
  short = 'short',
  long = 'long'
}
