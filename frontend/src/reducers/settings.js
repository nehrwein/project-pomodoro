import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import { ui } from "./ui"

export const settings = createSlice({
  name: 'settings',
  initialState: {
    workMinutes : null,
    shortBreakMinutes: null,
    longBreakMinutes: null
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

// deleting the user-account and all data
export const deleteAccount = (accessToken, userId) => {
  return (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
      },
    };

    dispatch(ui.actions.setLoading(true))
    fetch(API_URL(`users/${userId}`), options)
      .then((res) => res.json())
      .then((data) => console.log(data.response))
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}

// updating the settings of the Pomodoro Timer
export const updateSettings = (accessToken, userId, workMinutes, shortBreakMinutes, longBreakMinutes) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ workMinutes, shortBreakMinutes, longBreakMinutes }),
    };
    
    dispatch(ui.actions.setLoading(true))
    fetch(API_URL(`users/${userId}/settings`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('Settings were successfully updated')
        } else {
          console.log(data.response)
        }
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}
