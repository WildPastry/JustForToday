import { combineReducers } from '@reduxjs/toolkit';
import data from '../slices/dataSlice';
import dates from '../slices/dateSlice';
import loading from '../slices/loadingSlice';

const rootReducer = combineReducers({
  data,
  dates,
  loading
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
