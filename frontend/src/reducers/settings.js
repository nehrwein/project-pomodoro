import { createSlice } from "@reduxjs/toolkit";

export const settings = createSlice({
  name: 'settings',
  initialState: {
    workMinutes : 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
  },
  reducers: {
    setWorkMinutes: (state, action) => {
      state.workMinutes = action.payload
    },
    setShortBreakMinutes: (state, action) => {
      state.shortBreakMinutes = action.payload
    },
    setLongBreakMinutes: (state, action) => {
      state.longBreakMinutes = action.payload
    }
  }
})

