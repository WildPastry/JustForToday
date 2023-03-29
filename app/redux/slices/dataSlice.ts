import { AppDispatch, AppThunk } from '../store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setError, setLoading } from './loadingSlice';

// Set initialState
const initialState: DailyReflection[] = [];

/*
 * Create dataSlice with combined actions
 * Including: App data state
 */
const dataSlice = createSlice({
  name: 'setReflections',
  initialState,
  reducers: {
    setReflections(state, action: PayloadAction<DailyReflection[]>) {
      action.payload.forEach((reflection: DailyReflection) =>
        state.push(reflection)
      );
    }
  }
});

export const setReflections =
  (reflections: DailyReflection[]): AppThunk =>
  (dispatch) => {
    try {
      // Map each reflection
      console.log(dispatch);
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
      // Dispatch reflections once finished mapping
      dispatch(dataSlice.actions.setReflections(setReflection));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1500);
    } catch (err) {
      // Create error page if failed
      dispatch(setError(true));
    }
  };

// Export Data actions from DataSlice
// export const { setReflections } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
