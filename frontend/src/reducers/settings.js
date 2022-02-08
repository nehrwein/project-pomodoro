import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";

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