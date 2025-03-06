import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DarkModeState } from "@/lib/interface/index";

const initialState: DarkModeState = {
  theme: "light",
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
        document.documentElement.classList.toggle("dark", action.payload === "dark");
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    },
  },
});

export const { toggleTheme, setTheme } = darkModeSlice.actions;
export default darkModeSlice.reducer;