import React, { useState }from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addTodo } from "../reducers/tasks";
import styled from "styled-components";
import { Icon } from "styled-components/Styling";

const AddTask = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const [task, setTask] = useState("");
  const plusIcon = <FontAwesomeIcon icon={faPlus} />
  const dispatch = useDispatch();

  const onAddTodo = (accessToken, userId, task) => {
    dispatch(addTodo(accessToken, userId, task))
    setTask('')
  }
  
  return (
    <AddTaskContainer>
        <AddButton type="submit" onClick={() => onAddTodo(accessToken, userId, task)}><Icon>{plusIcon}</Icon></AddButton>
        <Input
          id="task"
          type="text"
          value={task}
          placeholder="Add task here..."
          onChange={(e) => setTask(e.target.value)}
        />
    </AddTaskContainer>
  );
};

export default AddTask;

const AddTaskContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
	justify-content: center;
	border: 2px solid #D75004;
	border-radius: 8px;
  /*border-top: 2px solid #D75004;*/
  box-sizing: border-box;
	margin: 10px auto;
`; 

const AddButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
	padding: 10px;
`

const Input = styled.input`
  border: none transparent;
  outline: none;
  font-size: 20px;
`
