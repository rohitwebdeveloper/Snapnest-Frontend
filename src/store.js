import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import recentSlice from "./features/image/recentSlice";
import themeSlice from "./features/theme/themeSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recent: recentSlice,
        theme: themeSlice
    }
})