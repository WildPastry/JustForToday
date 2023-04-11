import { IDate, IDateFormat } from '../../types/date.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import format from 'date-fns/format';

// Set initialState
const initialState: IDate = {
  currentDate: Date.now(),
  currentDay: format(new Date(), IDateFormat.ddMM),
  today: format(new Date(), IDateFormat.ddMM)
};

// Create dateSlice which holds the current date items
const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<number>) {
      state.currentDate = action.payload;
    },
    setCurrentDay(state, action: PayloadAction<string>) {
      state.currentDay = action.payload;
    }
  }
});

/**
 * Function to convert a 4 digit string ID into a timestamp
 * @param {string} id 'currentDay' ID passed from the calendar
 * @returns {number} The current date as timestamp
 */
export const constructDateFromId = (id: string): number => {
  // Calculate current date from ID
  const day: string = id.slice(0, 2);
  const month: string = id.slice(2, 4);
  const year: number = new Date().getFullYear();
  const currentDateString: string = `${year}-${month}-${day}`;
  // Convert to timestamp for storage
  const currentDate: number = new Date(currentDateString).getTime();
  return currentDate;
};

// Export date actions
export const { setCurrentDate, setCurrentDay } = dateSlice.actions;

// Export reducer
export default dateSlice.reducer;
