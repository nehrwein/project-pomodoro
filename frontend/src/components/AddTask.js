import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { addTodo } from "../reducers/tasks"
import styled from "styled-components"

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
        <Icon>{plusIcon}</Icon>
      </AddButton>
      <Input
        taskColor={taskColor}
        id="task"
        type="text"
        value={task}
        placeholder="Add new task"
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => onPressEnter(e)}
      />
    </AddTaskContainer>
  )
}

export default AddTask

const AddTaskContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid ${(props) => props.taskColor};
  padding: 20px 0;
  gap: 10px;

/* 	@media (min-width: 768px) {
    border: 2px solid #d75004;
		border-radius: 30px;
		width:80%;
    max-width: 400px;
		margin-top:20px; */
  }
`

const AddButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
`

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 20px;
  color: ${(props) => props.taskColor};
  width: 144px;
  text-align: center;
  background-color: #fff9f5;

  ::placeholder {
    color: ${(props) => props.taskColor};
  }

  @media (min-width: 768px) {
    font-size: 30px;
    width: 240px;
  }

  @media (min-width: 1024px) {
    font-size: 40px;
    width: 400px;
  }
`

const Icon = styled.i`
  color: #747171;
  font-size: 20px;
`
