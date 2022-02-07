import { createSlice } from "@reduxjs/toolkit"

export const timer = createSlice({
  name: "timer",
  initialState: {
    items: {},
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload
    },
    setDescription: (store) => {
      store.items.description = "Tap on a task to start"
    },
    deleteItems: (store) => {
      store.items = {}
    }
  },
})
