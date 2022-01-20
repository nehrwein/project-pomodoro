import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../utils/constants'
import tasks from '../reducers/tasks'
import user from '../reducers/user'

const Main = () => {
 	// const tasksItems = useSelector((store) => store.tasks.items)
  const accessToken = useSelector((store) => store.user.accessToken)

  const userId = useSelector((store) => store.user.userId)
 
  const [task, setTask] = useState('')
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(API_URL('tasks'), options)
      .then((res) => res.json())
      .then((data) => {
				console.log(data)
        if (data.success) {
          dispatch(tasks.actions.setItems(data.response))
          dispatch(tasks.actions.setError(null))
        } else {
          dispatch(tasks.actions.setItems([]))
          dispatch(tasks.actions.setError(data.response))
        }
      })
  }, [accessToken, dispatch])

	const onAddTodo = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ description: task, user: userId })
    }

    fetch(API_URL('tasks'), options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
	};
  

  return (
    <div>
      <h1>The main pomodoro site:</h1>
      <input
          id="task"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      <button onClick={onAddTodo}>Add task</button>
      {/*{tasksItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))}*/}
      <button onClick={() => dispatch(user.actions.setAccessToken(null))}>Log out</button>
    </div>
  )
}

export default Main