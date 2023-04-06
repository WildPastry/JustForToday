import {
  Action,
  CombinedState,
  PayloadAction,
  ThunkDispatch,
  createSlice
} from '@reduxjs/toolkit';
import { setError, setLoading } from './loadingSlice';

import getReflections from '../../api/getDailyReflections';
import getMonths from '../../api/getMonthItems';
import { AppThunk } from '../store';
import { MonthItems } from '../../types/date.types';

// Set initialState
const initialState = {
  monthItems: [] as MonthItems[]
};

/*
 * Create dateSlice with combined actions
 * Including: App data state (daily months)
 */
const dateSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setMonthItems(state, action: PayloadAction<MonthItems[]>) {
      action.payload.forEach((month: MonthItems) =>
        state.monthItems.push(month)
      );
    }
  }
});

export const setMonthItems =
  (months: MonthItems[]): AppThunk =>
  (dispatch: ThunkDispatch<CombinedState<{}>, unknown, Action<string>>) => {
    try {
      // Map each month
      const setMonthItem: MonthItems[] = months.map((month) => ({
        id: month.id,
        name: month.name,
        days: month.days
      }));
      // Dispatch months to store
      dispatch(dateSlice.actions.setMonthItems(setMonthItem));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    } catch (err) {
      // Set error state if failed
      dispatch(setError(true));
    }
  };

// Export reducer
export default dateSlice.reducer;
