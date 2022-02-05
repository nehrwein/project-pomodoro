import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import {
  showTasklist,
  updateTodo,
  deleteTodo,
  toggleIsComplete,
} from "../reducers/tasks"
import { timer } from "../reducers/timer"
import AddTask from "./AddTask"
import LoadingIndicator from "./LoadingIndicator"
// import PomodoroTimer from "./PomodoroTimer"

import styled from "styled-components/macro"

const TaskList = () => {
  const allTasks = useSelector((store) => store.tasks.items.tasks)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const loading = useSelector((store) => store.ui.loading)
  const error = useSelector((store) => store.tasks.error)
  console.log("Error: ", error)
  console.log("AT: ", accessToken)
  console.log("userId: ", userId)
  console.log('allTasks: ', allTasks)

  const [pickedId, setPickedId] = useState("")
  const [updatedDescription, setUpdatedDescription] = useState("")

  const trashCanIcon = <FontAwesomeIcon icon={faTrash} />
  const penIcon = <FontAwesomeIcon icon={faPen} />

  // We need to change the color of the task depending on if user is doing a pomodoro or having a break
  // We need to access information from PomodoroTimer.js

  // const red = "#592101"
  // const blue = "#202D48"
  // const taskColor = work ? red : blue

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showTasklist(accessToken, userId))
  }, [dispatch, accessToken, userId])

  const onUpdateTodo = (taskId, accessToken, updatedDescription, userId) => {
    dispatch(updateTodo(taskId, accessToken, updatedDescription, userId))
    setPickedId("")
    setUpdatedDescription("")
  }

  return (
    <>
      <TaskWrapper>
        {loading && <LoadingIndicator />}
        {allTasks && !loading && (
          <>
            {allTasks.map((item) => (
              <Task
                key={item._id}
                // taskColor={taskColor}
                completed={item.completed}
              >
                <div>
                  <CheckboxInput
                    id="completed"
                    checked={item.completed}
                    type="checkbox"
                    onChange={() =>
                      dispatch(
                        toggleIsComplete(
                          item._id,
                          item.completed,
                          item.completedAt,
                          accessToken,
                          userId
                        )
                      )
                    }
                  />

                  {item._id === pickedId && item.completed === false ? (
                    <>
                      <input
                        type="text"
                        value={updatedDescription}
                        onChange={(event) => {
                          setUpdatedDescription(event.target.value)
                        }}
                      />
                      <button
                        type="submit"
                        onClick={() =>
                          onUpdateTodo(
                            item._id,
                            accessToken,
                            updatedDescription,
                            userId
                          )
                        }
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <TaskDescription
                      onClick={() => dispatch(timer.actions.setItems(item))}
                      completed={item.completed}
                    >
                      {item.description}
                    </TaskDescription>
                  )}
                </div>

                <TaskSettings>
                  {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                  <div onClick={() => setPickedId(item._id)}>
                    <Icon>{penIcon}</Icon>
                  </div>
                  <div
                    onClick={() =>
                      dispatch(deleteTodo(accessToken, userId, item._id))
                    }
                  >
                    <Icon>{trashCanIcon}</Icon>
                  </div>
                </TaskSettings>
              </Task>
            ))}
          </>
        )}
        <AddTask />
      </TaskWrapper>
    </>
  )
}

export default TaskList

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  gap: 20px;
  position: relative;
`

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => (props.completed ? "#B4B2B2" : "#592101")};
  width: 70%;
`
const TaskSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /*width: 20%;*/
  gap: 20px;
`

const Icon = styled.i`
  color: #b4b2b2;
  font-size: 16px;
`

const CheckboxInput = styled.input.attrs({ type: "checkbox" })``

const TaskDescription = styled.label`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  margin-left: 8px;
`
