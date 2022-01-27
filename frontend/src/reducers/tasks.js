import { createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../utils/constants";
import { ui } from "./ui"

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

// getting all the users tasks
export const showTasklist = (accessToken, userId) => {
  return (dispatch) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    dispatch(ui.actions.setLoading(true))
    fetch(API_URL(`tasks/${userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(tasks.actions.setItems(data.response));
          dispatch(tasks.actions.setError(null));
        } else {
          dispatch(tasks.actions.setItems([]));
          dispatch(tasks.actions.setError(data.response));
        }
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}

// posting a new task
export const addTodo = (accessToken, userId, task) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ description: task, user: userId }),
    };

    dispatch(ui.actions.setLoading(true))
    fetch(API_URL("tasks"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(showTasklist(accessToken, userId));
          dispatch(tasks.actions.setError(null));
        } else {
          dispatch(tasks.actions.setError(data.response));
        }
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}

// deleting a task
export const deleteTodo = (accessToken, userId, taskId) => {
  return (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ user: userId }),
    };
    
    dispatch(ui.actions.setLoading(true))
    fetch(API_URL(`tasks/${taskId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(showTasklist(accessToken, userId));
          dispatch(tasks.actions.setError(null));
        } else {
          dispatch(tasks.actions.setError(data.response));
        }
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}

// updating/editing an existing task
export const updateTodo = (taskId, accessToken, task, userId) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ description: task, user: userId }),
    };
    
    dispatch(ui.actions.setLoading(true))
    fetch(API_URL(`tasks/${taskId}/update`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(showTasklist(accessToken, userId));
          dispatch(tasks.actions.setError(null));
        } else {
          dispatch(tasks.actions.setError(data.response));
        }
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}

// complete or uncomplete an existing task
export const toggleIsComplete = (_id, completed, completedAt, accessToken, userId) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ user: userId, completed: !completed ? true : false, completedAt: completedAt === null ? new Date() : null }),
    };
    
    dispatch(ui.actions.setLoading(true))
    fetch(API_URL(`tasks/${_id}/complete`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(showTasklist(accessToken, userId));
          dispatch(tasks.actions.setError(null));
        } else {
          dispatch(tasks.actions.setError(data.response));
        }
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  }
}

