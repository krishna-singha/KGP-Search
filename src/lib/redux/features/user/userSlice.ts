import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

// Define a serializable user type
interface UserState {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const initialState: UserState = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
};

// Async function to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return new Promise<UserState | null>((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        resolve(null);
      }
    });
  });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState | null>) => {
      if (action.payload) {
        state.uid = action.payload.uid;
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.photoURL = action.payload.photoURL;
      } else {
        state.uid = null;
        state.displayName = null;
        state.email = null;
        state.photoURL = null;
      }
    },
    logout: (state) => {
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.uid = action.payload.uid;
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.photoURL = action.payload.photoURL;
      }
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
