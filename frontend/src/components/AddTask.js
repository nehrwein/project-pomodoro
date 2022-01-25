import React, { useState }from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addTodo } from "../reducers/tasks";
import styled from "styled-components";

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
      <Button type="submit" onClick={() => onAddTodo(accessToken, userId, task)}><Icon>{plusIcon}</Icon></Button>
      <input
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

const Icon = styled.i`
  color: #999696;
  font-size: 20px;
`;

const Button = styled.button`
  border: none; 
  background-color: #FFF9F5;
  cursor: pointer;
`;

const AddTaskContainer = styled.div`
  display: flex; 
  justify-content: center;
  margin: 20px 0; 
`; 