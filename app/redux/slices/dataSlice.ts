import {
  Action,
  ActionReducerMapBuilder,
  CombinedState,
  PayloadAction,
  ThunkDispatch,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  IDailyReflection,
  IData,
  IStep,
  ITraditions
} from '../../types/data.types';
import { IMonthItem } from '../../types/date.types';
import getDailyReflections from '../../api/getDailyReflections';
import getMonthItems from '../../api/getMonthItems';
import getTwelveSteps from '../../api/getTwelveSteps';
import getTwelveTraditions from '../../api/getTwelveTraditions';

// Set initialState
const initialState: IData = {
  dailyReflections: [] as IDailyReflection[],
  steps: [] as IStep[],
  traditions: {} as ITraditions,
  monthItems: [] as IMonthItem[],
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
      dailyReflections: IDailyReflection[];
      steps: IStep[];
      traditions: ITraditions;
      monthItems: IMonthItem[];
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
      // Steps
      .addCase(fetchStepsFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStepsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.steps = action.payload;
      })
      .addCase(fetchStepsFromAPI.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // Traditions
      .addCase(fetchTraditionsFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTraditionsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.traditions = action.payload;
      })
      .addCase(fetchTraditionsFromAPI.rejected, (state) => {
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

// Fetch steps
export const fetchStepsFromAPI = createAsyncThunk(
  'mySlice/fetchStepsFromAPI',
  async () => {
    const response = await getTwelveSteps();
    return response;
  }
);

// Fetch traditions
export const fetchTraditionsFromAPI = createAsyncThunk(
  'mySlice/fetchTraditionsFromAPI',
  async () => {
    const response = await getTwelveTraditions();
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
        dispatch(fetchStepsFromAPI()),
        dispatch(fetchTraditionsFromAPI()),
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
