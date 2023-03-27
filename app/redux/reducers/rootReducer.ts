import { combineReducers } from '@reduxjs/toolkit';
import counter from '../slices/counterSlice';
import loading from '../slices/loadingSlice';

const rootReducer = combineReducers({
  counter,
  loading
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
