import { createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../utils/constants"
import { format } from "date-fns"

export const timer = createSlice({
  name: "timer",
  initialState: {
    items: {},
    mode: "work",
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
    },
    setMode: (store, action) => {
      store.mode = action.payload
    },
  },
})

// increasing pomodoros
export const addPomodoro = (accessToken, userId) => {
  return () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ completedAt: format(new Date(), "dd.MM.yyyy") }),
    }

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
