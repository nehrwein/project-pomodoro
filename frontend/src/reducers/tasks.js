import { createSlice } from "@reduxjs/toolkit"

export const tasks = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})


