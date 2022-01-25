import React, { useEffect }from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { showTasklist, ToggleIsComplete } from "../reducers/tasks";
import styled from "styled-components";
import AddTask from './AddTask';

const TaskList = () => {
  const allTasks = useSelector((store) => store.tasks.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const error = useSelector((store) => store.tasks.error)
  console.log('Error: ', error)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(showTasklist(accessToken, userId))
  }, [dispatch, accessToken, userId])

  const trashCanIcon = <FontAwesomeIcon icon={faTrash} />
  const penIcon = <FontAwesomeIcon icon={faPen} />
  
  return (
    <TaskContainer>
      {allTasks.map((item) => (
        <Task key={item._id}>
          <TextContainer>
            <input 
              id='completed'
              type='checkbox' 
              onChange={() => dispatch(ToggleIsComplete(item._id, accessToken, userId))}
            />
            <label
              htmlFor='completed'>{item.description}
            </label>
          </TextContainer>
          <ButtonsContainer>
            {/* Edit/Update feature below needs to be fixed so that user can edit the items. https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
    {/*         <div onDoubleClick={() => onUpdateTodo(item._id)}><Icon>{penIcon}</Icon></div>
            <Button onClick={() => onDeleteTodo(item._id)}><Icon>{trashCanIcon}</Icon></Button> */}
          </ButtonsContainer>
        </Task>
      ))}
       <AddTask />
    </TaskContainer>
   )
};

export default TaskList;

const TaskContainer = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  background-color: #FFF9F5;
`;

const Task = styled.div`
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 20%;
  margin-right: 10px;
`;

const TextContainer = styled.div`
  width:80%;
  margin-left: 20px;
`;

//const ToDoLabel = styled.label`
//  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
//`
