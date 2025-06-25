import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
  loading: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.status = true;
      state.user = action.payload;
      state.loading = false
    },
    signUp: (state, action) => {
      state.status = true;
      state.user = action.payload;
      state.loading = false
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
      state.loading = false
    },
    setUser: (state, action) => {
      state.status = true;
      state.user = action.payload;
      state.loading = false
    }
  }
});

export const { signIn, signUp, logout, setUser } = authSlice.actions
export default authSlice.reducer