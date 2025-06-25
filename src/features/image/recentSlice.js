import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const recentSlice = createSlice({
    name:'recent',
    initialState,
    reducers:{
        add: (state, action) => {
          state.push(action.payload)
        },
        remove: (state) => {
           state = []
        }
    }
})

export const {add} = recentSlice.actions
export default recentSlice.reducer