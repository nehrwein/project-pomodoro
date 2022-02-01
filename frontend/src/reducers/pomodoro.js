import { createSlice } from "@reduxjs/toolkit"

export const pomodoro = createSlice({
  name: "pomodoro",
  initialState: {
    items: []
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload
    },
    setDescription: (store) => {
      store.items.description = 'Tap on a task to start'
    }
  },
})