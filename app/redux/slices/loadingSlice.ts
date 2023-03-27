import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Set initialState
const initialState = {
  isLoading: true,
  isError: false
};

/*
 * Create loadingSlice with combined actions
 * Including: App loading state and app error state
 */
const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    }
  }
});

// Export loading actions from loadingSlice
export const { setLoading, setError } = loadingSlice.actions;

// Export reducer
export default loadingSlice.reducer;
