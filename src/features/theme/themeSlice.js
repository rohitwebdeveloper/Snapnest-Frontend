import { createSlice } from "@reduxjs/toolkit";

const initialState = 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    darkTheme: () => 'dark',
    lightTheme: () => 'light',
  },
});

export const { darkTheme, lightTheme } = themeSlice.actions;
export default themeSlice.reducer;
