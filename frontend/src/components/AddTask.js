import React, { useState }from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addTodo } from "../reducers/tasks";
import styled from "styled-components";
import { Icon } from "styled-components/Styling";

import { UserInput } from "styled-components/Styling"

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
        <UserInput
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
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  border: 1px solid #D75004;
  box-sizing: border-box;
  border-radius: 20px;
`; 

const AddButton = styled.button`
  padding: 10px 20px;
  color: white;
`
