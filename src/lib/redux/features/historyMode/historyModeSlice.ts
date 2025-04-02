import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HistoryModeState {
  enabled: boolean;
}

const initialState: HistoryModeState = {
  enabled: typeof window !== "undefined" ? localStorage.getItem("historyMode") !== "false" : true,
};

export const historyModeSlice = createSlice({
  name: "historyMode",
  initialState,
  reducers: {
    setHistoryMode: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("historyMode", action.payload.toString());
      }
    },
    toggleHistoryMode: (state) => {
      const newMode = !state.enabled;
      state.enabled = newMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("historyMode", newMode.toString());
      }
    },
  },
});

export const { setHistoryMode, toggleHistoryMode } = historyModeSlice.actions;
export default historyModeSlice.reducer;
