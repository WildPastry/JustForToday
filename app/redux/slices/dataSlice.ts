import {
  Action,
  ActionReducerMapBuilder,
  CombinedState,
  PayloadAction,
  ThunkDispatch,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { IData, IReflection, IStep, ITraditions } from '../../types/data.types';
import { IMonthItem } from '../../types/date.types';
import getMonthItems from '../../api/getMonthItems';
import getReflections from '../../api/getReflections';
import getSteps from '../../api/getSteps';
import getTraditions from '../../api/getTraditions';

// Set initialState
const initialState: IData = {
  reflections: [] as IReflection[],
  steps: [] as IStep[],
  traditions: {} as ITraditions,
  monthItems: [] as IMonthItem[],
  loading: true,
  error: false
};

/*
 * Create dataSlice with combined actions and reducers
 * Including App data states:
 *  Reflections
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
      reflections: IReflection[];
      steps: IStep[];
      traditions: ITraditions;
      monthItems: IMonthItem[];
      loading: boolean;
      error: boolean;
    }>
  ) => {
    builder
      // Reflections
      .addCase(fetchReflectionsFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReflectionsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.reflections = action.payload;
      })
      .addCase(fetchReflectionsFromAPI.rejected, (state) => {
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

// Fetch reflections
export const fetchReflectionsFromAPI = createAsyncThunk(
  'mySlice/fetchReflectionsFromAPI',
  async () => {
    const response = await getReflections();
    return response;
  }
);

// Fetch steps
export const fetchStepsFromAPI = createAsyncThunk(
  'mySlice/fetchStepsFromAPI',
  async () => {
    const response = await getSteps();
    return response;
  }
);

// Fetch traditions
export const fetchTraditionsFromAPI = createAsyncThunk(
  'mySlice/fetchTraditionsFromAPI',
  async () => {
    const response = await getTraditions();
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
        dispatch(fetchReflectionsFromAPI()),
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
