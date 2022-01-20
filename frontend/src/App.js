import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import Main from './components/Main'
import Login from './components/Login'
import NotFound from './components/NotFound'

import user from './reducers/user'
import tasks from './reducers/tasks'

const reducer = combineReducers({
  user: user.reducer,
  tasks: tasks.reducer
})

const preloadedStateJSON = localStorage.getItem('UserTasksReduxState')
let preloadedState = {}

if (preloadedStateJSON) {
  preloadedState = JSON.parse(preloadedStateJSON)
}

//configures the store with the slices and the localstate
const store = configureStore({ reducer, preloadedState })

//Store the state in localstorage, when Redux state changes
store.subscribe(() => {
  localStorage.setItem('UserTasksReduxState', JSON.stringify(store.getState()))
})

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} /> 
          <Route path="/login" element={<Login />} />
          {/* * new feature in react router for not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
