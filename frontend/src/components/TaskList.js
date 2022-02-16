import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons"
import {
  showTasklist,
  updateTodo,
  deleteTodo,
  toggleIsComplete,
} from "../reducers/tasks"
import { timer } from "../reducers/timer"
import LoadingIndicator from "./LoadingIndicator"
import { Checkbox } from "../library/Checkbox"

import styled from "styled-components/macro"

const TaskList = () => {
  const allTasks = useSelector((store) => store.tasks.items.tasks)
  const allOpenTasks =
    allTasks && allTasks.filter((item) => item.completed === false)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const loading = useSelector((store) => store.ui.loading)

  const [pickedId, setPickedId] = useState("")
  const [updatedDescription, setUpdatedDescription] = useState("")

  const trashCanIcon = <FontAwesomeIcon icon={faTrash} />
  const penIcon = <FontAwesomeIcon icon={faPen} />
  const saveIcon = <FontAwesomeIcon icon={faPlus} />

  const activatedTask = useSelector((state) => state.timer.items._id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showTasklist(accessToken, userId))
  }, [dispatch, accessToken, userId])

  const onPressEnter = (event, id) => {
    if (event.key === "Enter") {
      onUpdateTodo(id, accessToken, updatedDescription, userId)
    }
  }

  const onUpdateTodo = (taskId, accessToken, updatedDescription, userId) => {
    dispatch(updateTodo(taskId, accessToken, updatedDescription, userId))
    setPickedId("")
    setUpdatedDescription("")
  }

  const onIsComplete = (_id, completed, completedAt, accessToken, userId) => {
    dispatch(toggleIsComplete(_id, completed, completedAt, accessToken, userId))
    dispatch(timer.actions.deleteItems())
    dispatch(timer.actions.setDescription())
  }

  // color changes depending on mode
  const colorMode = useSelector((store) => store.timer.mode)
  const taskColor = colorMode === "work" ? "var(--red)" : "var(--blue)"

  return (
    <>
      <TaskWrapper loadingAnimation={loading}>
        {loading && <LoadingIndicator />}
        {allOpenTasks && !loading && (
          <>
            {allOpenTasks.map((item) => (
              <Task key={item._id}>
                {item._id === pickedId ? (
                  <>
                    <EditInput
                      type="text"
                      value={updatedDescription}
                      onKeyPress={(e) => onPressEnter(e, item._id)}
                      onChange={(event) => {
                        setUpdatedDescription(event.target.value)
                      }}
                      onDoubleClick={() => setPickedId("")}
                    />
                    <SaveButton
                      type="submit"
                      disabled={!updatedDescription}
                      onClick={() =>
                        onUpdateTodo(
                          item._id,
                          accessToken,
                          updatedDescription,
                          userId
                        )
                      }
                    >
                      <Icon>{saveIcon}</Icon>
                    </SaveButton>
                  </>
                ) : (
                  <CheckContainer>
                    <Checkbox
                      isChecked={item.completed}
                      onChange={() =>
                        onIsComplete(
                          item._id,
                          item.completed,
                          item.completedAt,
                          accessToken,
                          userId
                        )
                      }
                    />
                    <TaskLabel
                      taskColor={taskColor}
                      onClick={() => dispatch(timer.actions.setItems(item))}
                    >
                      {item.description}
                    </TaskLabel>
                  </CheckContainer>
                )}
                <TaskSettings>
                  {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                  {!activatedTask ? (
                    <div
                      onClick={() => setPickedId(item._id)}
                      onDoubleClick={() => setPickedId("")}
                    >
                      <Icon>{penIcon}</Icon>
                    </div>
                  ) : (
                    <div>
                      <Icon>{penIcon}</Icon>
                    </div>
                  )}
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
      </TaskWrapper>
    </>
  )
}

export default TaskList

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 95%;
  min-height: 45%;
  overflow-y: auto;

  @media (min-width: 768px) {
    max-width: 550px;
  }

  @media (min-width: 1024px) {
    max-width: 1000px;
    min-height: 30vh;
    display: grid;
    grid-template-columns: ${(props) =>
      props.loadingAnimation ? "1fr" : "1fr 1fr"};
    justify-items: center;
    align-content: start;
  }
`

const Task = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;

  @media (min-width: 1024px) {
    padding: 6px 20px;
  }
`

const TaskSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 20px;
`

const Icon = styled.i`
  color: #b4b2b2;
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 25px;
  }
`

const CheckContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`

const EditInput = styled.input`
  border: none;
  border-bottom: 1px solid red;
  outline: none;
  font-size: 20px;
  color: var(--lightRed);
  width: 67%;
  background-color: transparent;
`

const SaveButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  cursor: pointer;
`

const TaskLabel = styled.label`
  color: ${(props) => props.taskColor};
  padding-left: 8px;

  @media (min-width: 768px) {
    font-size: 20px;
    padding-bottom: 6px;
  }

  @media (min-width: 1024px) {
    font-size: 25px;
  }
`
