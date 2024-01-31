import { EDateFormat, IDate } from '../../types/date.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

// Set initialState
const initialState: IDate = {
  selectedDate: Date.now(),
  selectedDay: format(new Date(), EDateFormat.ddMM),
  currentMonth: format(new Date(), EDateFormat.MMM),
  currentDay: format(new Date(), EDateFormat.ddMM)
};

// Create dateSlice which holds the current date items
const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setSelectedDate(state, action: PayloadAction<number>) {
      state.selectedDate = action.payload;
    },
    setSelectedDay(state, action: PayloadAction<string>) {
      state.selectedDay = action.payload;
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
export const { setSelectedDate, setSelectedDay } = dateSlice.actions;

// Export reducer
export default dateSlice.reducer;
