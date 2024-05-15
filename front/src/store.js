import { configureStore } from '@reduxjs/toolkit'
import messageReducer from "./features/messages/messageSlice";
export const store = configureStore({
    reducer: {
        message: messageReducer
    },
})
