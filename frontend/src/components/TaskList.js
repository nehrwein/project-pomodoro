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
import { Task, TaskIcon, TaskLabel, TaskSettings, TaskWrapper, EditInput, SaveButton, CheckContainer } from "styled-components/Styling"

const TaskList = () => {
  const allTasks = useSelector((store) => store.tasks.items.tasks)
  const allOpenTasks =
    allTasks && allTasks.filter((item) => !item.completed)
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
                      <TaskIcon>{saveIcon}</TaskIcon>
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
                      <TaskIcon>{penIcon}</TaskIcon>
                    </div>
                  ) : (
                    <div>
                      <TaskIcon>{penIcon}</TaskIcon>
                    </div>
                  )}
                  <div
                    onClick={() =>
                      dispatch(deleteTodo(accessToken, userId, item._id))
                    }
                  >
                    <TaskIcon>{trashCanIcon}</TaskIcon>
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