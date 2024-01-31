import {
  AnyAction,
  CombinedState,
  Reducer,
  combineReducers
} from '@reduxjs/toolkit';
import { IData } from '../../types/data.types';
import { IDate } from '../../types/date.types';
import data from '../slices/dataSlice';
import date from '../slices/dateSlice';

const rootReducer: Reducer<
  CombinedState<{
    data: IData;
    date: IDate;
  }>,
  AnyAction
> = combineReducers({
  data,
  date
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
