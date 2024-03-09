import { Reducer, UnknownAction, combineReducers } from '@reduxjs/toolkit';
import { IData } from '../../types/data.types';
import { IDate } from '../../types/date.types';
import data from '../slices/dataSlice';
import date from '../slices/dateSlice';

const rootReducer: Reducer<
  {
    data: IData;
    date: IDate;
  },
  UnknownAction,
  Partial<{
    data: IData | undefined;
    date: IDate | undefined;
  }>
> = combineReducers({
  data,
  date
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
