import { createSlice } from "@reduxjs/toolkit";
import { AnonymousState } from "@/lib/interface/index";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: AnonymousState = {
  anonymous: false,
};

export const anonymousModeState = createSlice({
  name: "anonymousMode",
  initialState,
  reducers: {
    toggleAnonymous: (state, action: PayloadAction<boolean>) => {
      state.anonymous = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("anonymous", action.payload.toString());
      }
    },
  },
});

export const { toggleAnonymous } = anonymousModeState.actions;
export default anonymousModeState.reducer;
