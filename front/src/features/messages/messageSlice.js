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
        },
        error: (state) => {
            state.messages = [...state.messages, {
                sender: "С.И.С.Т.Е.М.А.",
                message: "Это сообщение видите только вы.",
                timestamp: new Date(Date.now()).toISOString(),
                error: "true",
                own: true
            }]
        }
    },
})

export const { add, setUsername, clear, error } = messageSlice.actions

export default messageSlice.reducer
