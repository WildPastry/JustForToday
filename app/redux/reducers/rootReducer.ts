import { combineReducers } from '@reduxjs/toolkit';
import data from '../slices/dataSlice';

const rootReducer = combineReducers({
  data
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
