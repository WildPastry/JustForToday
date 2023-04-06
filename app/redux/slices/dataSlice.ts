import {
  Action,
  ActionReducerMapBuilder,
  CombinedState,
  PayloadAction,
  ThunkDispatch,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import { DailyReflection } from '../../types/data.types';
import { MonthItems } from '../../types/date.types';
import getDailyReflections from '../../api/getDailyReflections';
import getMonthItems from '../../api/getMonthItems';

// Set initialState
const initialState = {
  dailyReflections: [] as DailyReflection[],
  monthItems: [] as MonthItems[],
  loading: true,
  error: false
};

/*
 * Create dataSlice with combined actions and reducers
 * Including App data states:
 * Daily Reflections
 * Month Items
 */
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Loading and error reducers
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    }
  },
  /*
   * Data reducers
   * Each of the data types includes 3 states:
   * Pending - waiting for response
   * Fulfilled - response successful
   * Rejected - response failed
   */
  extraReducers: (
    builder: ActionReducerMapBuilder<{
      dailyReflections: DailyReflection[];
      monthItems: MonthItems[];
      loading: boolean;
      error: boolean;
    }>
  ) => {
    builder
      // Daily reflections
      .addCase(fetchDailyReflectionsFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDailyReflectionsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyReflections = action.payload;
      })
      .addCase(fetchDailyReflectionsFromAPI.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // Month items
      .addCase(fetchMonthItemsFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthItemsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.monthItems = action.payload;
      })
      .addCase(fetchMonthItemsFromAPI.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

// Fetch daily reflections
export const fetchDailyReflectionsFromAPI = createAsyncThunk(
  'mySlice/fetchDailyReflectionsFromAPI',
  async () => {
    const response = await getDailyReflections();
    return response;
  }
);

// Fetch month items
export const fetchMonthItemsFromAPI = createAsyncThunk(
  'mySlice/fetchMonthItemsFromAPI',
  async () => {
    const response = await getMonthItems();
    return response;
  }
);

// Fetch all data
export const setData =
  () =>
  async (
    dispatch: ThunkDispatch<CombinedState<{}>, unknown, Action<string>>
  ) => {
    try {
      // Dispatch both thunks in parallel
      await Promise.all([
        dispatch(fetchDailyReflectionsFromAPI()),
        dispatch(fetchMonthItemsFromAPI())
      ]);
    } catch (error) {
      // Set error screen if failed
      dispatch(setError(true));
    }
  };

// Export error and loading actions
export const { setLoading, setError } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
