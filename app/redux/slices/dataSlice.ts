import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Set initialState
const initialState = {
  currentData: {}
};

/*
 * Create loadingSlice with combined actions
 * Including: App loading state and app error state
 */
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setReflectionData(state, action: PayloadAction<DailyReflections>) {
      state.currentData = action.payload;
    }
  }
});

// Export Data actions from DataSlice
export const { setReflectionData } = dataSlice.actions;

// Export reducer
export default dataSlice.reducer;
