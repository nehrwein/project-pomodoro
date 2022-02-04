import { createSlice } from "@reduxjs/toolkit"

export const timer = createSlice({
  name: "timer",
  initialState: {
    items: {},
  },
  reducers: {
    setItems: (store, action) => {
			console.log(store)
      store.items = action.payload
    },
    setDescription: (store) => {
      store.items = {}
      store.items.description = "Tap on a task to start"
    },
  },
})
