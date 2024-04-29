import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
    username: ""
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        add: (state, action) => {
            state.messages = [...state.messages, action.payload]
        },
        clear: (state) => {
            state.messages = [];
        },
        setUsername: (state, action) => {
            state.username = action.payload
        }
    },
})

export const { add, setUsername, clear } = messageSlice.actions

export default messageSlice.reducer
