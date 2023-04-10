import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDate } from '../../types/date.types';
import format from 'date-fns/format';

/**
 * Helper function to get the ID of the current day
 * @returns {string} ID for the current day
 */
export const getCurrentDay = (): string => {
  // Calculate current day
  const currentDay = format(new Date(), 'ddMM');
  return currentDay;
};

/**
 * Helper function to get a date display string
 * @returns {string} Date display string
 */
export const getCurrentDate = (dateId: string): string => {
  console.log('dateId', dateId);
  // Calculate current date
  const currentDay = new Date(dateId).toLocaleString();
  return currentDay;
};

// Set initialState
const initialState: IDate = {
  currentDay: format(new Date(), 'ddMM'),
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
