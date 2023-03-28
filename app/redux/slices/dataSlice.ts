import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Set initialState
const initialState: DailyReflection[] = [];

/*
 * Create dataSlice with combined actions
 * Including: App data state
 */
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setReflections(state, action: PayloadAction<DailyReflection[]>) {
      action.payload.forEach((reflection: DailyReflection) => state.push(reflection));
    }
  }
});

// Export Data actions from DataSlice
export const { setReflections } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
