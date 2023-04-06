import { combineReducers } from '@reduxjs/toolkit';
import data from '../slices/dataSlice';
import loading from '../slices/loadingSlice';

const rootReducer = combineReducers({
  data,
  loading
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
