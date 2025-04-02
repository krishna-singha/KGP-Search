import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filter/filterSlice";
import darkModeReducer from "./features/darkMode/darkModeSlice";
import anonymousModeReducer from "./features/anonymousMode/anonymousModeSlice";
import historyModeReducer from "./features/historyMode/historyModeSlice";
import userReducer from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      darkMode: darkModeReducer,
      anonymousMode: anonymousModeReducer,
      historyMode: historyModeReducer,
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
