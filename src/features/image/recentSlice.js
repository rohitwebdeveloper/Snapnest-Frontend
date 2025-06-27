import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload)
    },
    remove: () => []
  }
})

export const { add, remove } = recentSlice.actions
export default recentSlice.reducer