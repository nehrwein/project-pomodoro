import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import { ui } from "./ui"

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
