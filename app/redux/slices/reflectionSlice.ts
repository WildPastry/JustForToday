import {
  Action,
  CombinedState,
  PayloadAction,
  ThunkDispatch,
  createSlice
} from '@reduxjs/toolkit';
import { setError, setLoading } from './loadingSlice';

import { AppThunk } from '../store';

// Set initialState
const initialState = {
  dailyReflections: [] as DailyReflection[]
};

/*
 * Create dataSlice with combined actions
 * Including: App data state (daily reflections)
 */
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setReflections(state, action: PayloadAction<DailyReflection[]>) {
      action.payload.forEach((reflection: DailyReflection) =>
        state.dailyReflections.push(reflection)
      );
    }
  }
});

export const setReflections =
  (reflections: DailyReflection[]): AppThunk =>
  (dispatch: ThunkDispatch<CombinedState<{}>, unknown, Action<string>>) => {
    try {
      // Map each reflection
      const setReflection: DailyReflection[] = reflections.map(
        (reflection) => ({
          id: reflection.id,
          date: reflection.date,
          title: reflection.title,
          quote: reflection.quote,
          source: reflection.source,
          reflection: reflection.reflection
        })
      );
      // Dispatch reflections to store
      dispatch(dataSlice.actions.setReflections(setReflection));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 3000);
    } catch (err) {
      // Set error state if failed
      dispatch(setError(true));
    }
  };

// Export reducer
export default dataSlice.reducer;
