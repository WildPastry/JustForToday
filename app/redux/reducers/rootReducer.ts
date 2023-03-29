import { combineReducers } from '@reduxjs/toolkit';
import loading from '../slices/loadingSlice';
import setReflections from '../slices/dataSlice';

const rootReducer = combineReducers({
  setReflections,
  loading
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
