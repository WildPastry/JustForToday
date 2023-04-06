/* eslint-disable */
import {
  Action,
  CombinedState,
  PayloadAction,
  ThunkDispatch,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { setError, setLoading } from './loadingSlice';

import getDailyReflections from '../../api/getDailyReflections';
import getMonthItems from '../../api/getMonthItems';
import { AppThunk } from '../store';
import { DailyReflection } from '../../types/data.types';
import { MonthItems } from '../../types/date.types';

// Set initialState
const initialState = {
  dailyReflections: [] as DailyReflection[],
  monthItems: [] as MonthItems[],
  loading: true,
  error: false
};

/*
 * Create dataSlice with combined actions
 * Including App data states:
 * Daily Reflections
 * Month Items
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFirstData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // state.firstData = action.payload;
      })
      .addCase(fetchFirstData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchSecondData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSecondData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // state.secondData = action.payload;
      })
      .addCase(fetchSecondData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

/*
 * Create dataSlice with combined actions
 * Including: App data state (daily reflections)
 */
export const fetchFirstData = createAsyncThunk(
  'mySlice/fetchFirstData',
  async () => {
    const response = getDailyReflections();
    return response;
  }
);

export const fetchSecondData = createAsyncThunk(
  'mySlice/fetchSecondData',
  async () => {
    const response = getMonthItems();
    return response;
  }
);

export const fetchDoubleData = () => async (dispatch: ThunkDispatch<CombinedState<{}>, unknown, Action<string>>) => {
  try {
    // Dispatch both thunks in parallel
    await Promise.all([dispatch(fetchFirstData()), dispatch(fetchSecondData())]);
  } catch (error) {
    console.error('Error fetching double data:', error);
  }
};

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
