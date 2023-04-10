import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDate } from '../../types/date.types';

/**
 * Helper function to get the ID of the current day
 * @returns {string} ID of the current day
 */
export const getCurrentDay = (): string => {
  // Calculate current day and month
  const currentDate: Date = new Date();
  const month: string = currentDate.toLocaleString('default', {
    month: 'short'
  });
  const day: string = currentDate.getDate().toString();
  // Use current day and month as ID
  const currentDay: string = month + day;
  return currentDay;
};

// Set initialState
const initialState: IDate = {
  currentDay: getCurrentDay(),
  today: getCurrentDay()
};

// Create dateSlice which holds the current date
const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setCurrentDay(state, action: PayloadAction<string>) {
      state.currentDay = action.payload;
    }
  }
});

// Export date action
export const { setCurrentDay } = dateSlice.actions;

// Export reducer
export default dateSlice.reducer;
