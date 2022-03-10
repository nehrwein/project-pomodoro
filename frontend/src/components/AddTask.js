import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { addTodo } from "../reducers/tasks"
import { AddTaskContainer, AddButton, AddInput, AddIcon } from "styled-components/Styling"

const AddTask = () => {
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const [task, setTask] = useState("")
  const plusIcon = <FontAwesomeIcon icon={faPlus} />
  const dispatch = useDispatch()

  const onPressEnter = (event) => {
    if (event.key === "Enter") {
      onAddTodo(accessToken, userId, task)
    }
  }

  const onAddTodo = (accessToken, userId, task) => {
    dispatch(addTodo(accessToken, userId, task))
    setTask("")
  }

  // color changes depending on mode
  const colorMode = useSelector((store) => store.timer.mode)
  const taskColor = colorMode === "work" ? "var(--red)" : "var(--blue)"

  return (
    <AddTaskContainer taskColor={taskColor}>
      <AddButton
        type="submit"
        disabled={!task}
        onClick={() => onAddTodo(accessToken, userId, task)}
      >
        <AddIcon>{plusIcon}</AddIcon>
      </AddButton>
      <AddInput
        taskColor={taskColor}
        id="task"
        type="text"
        value={task}
        placeholder="Add new task"
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={onPressEnter}
      />
    </AddTaskContainer>
  )
}

export default AddTask


