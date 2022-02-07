import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";

export const pomosettings = createSlice({
  name: 'pomosettings',
  initialState: {
    workMinutes : 25,
    breakMinutes: 5,
  },
  reducers: {
    setWorkMinutes: (state, action) => {
      state.workMinutes = action.payload
    },
    setBreakMinutes: (state, action) => {
      state.breakMinutes = action.payload
    }
  }
})

// increasing pomodoros
export const addPomodoro = (accessToken, userId, completedAt) => {
  return () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ completedAt: completedAt }),
    };

    fetch(API_URL(`tasks/${userId}/pomodoro`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.response)
        } else {
          console.log(data.response)
        }
      })
  }
}
