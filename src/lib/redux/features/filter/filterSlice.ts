import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FilterState } from '@/lib/interface/index'

// Get the initial value from localStorage (only in browser)
const getInitialFilter = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("filter") || "All";
  }
  return "All";
};

const initialState: FilterState = {
  value: getInitialFilter(),
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("filter", action.payload);
      }
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;