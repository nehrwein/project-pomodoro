import React, { useEffect, useState }from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { showTasklist, updateTodo, deleteTodo, toggleIsComplete } from "../reducers/tasks";
import AddTask from './AddTask';
import LoadingIndicator from './LoadingIndicator';

import styled from "styled-components/macro";
//import { Icon } from "styled-components/Styling";

const TaskList = () => {
  const allTasks = useSelector((store) => store.tasks.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const loading = useSelector((store) => store.ui.loading)
  const error = useSelector((store) => store.tasks.error)
  console.log('Error: ', error)

  const [pickedId, setPickedId] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState('')

  const trashCanIcon = <FontAwesomeIcon icon={faTrash} />
  const penIcon = <FontAwesomeIcon icon={faPen} />
  
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(showTasklist(accessToken, userId))
  }, [dispatch, accessToken, userId])

  const onUpdateTodo = (taskId, accessToken, updatedDescription, userId) => {
    dispatch(updateTodo(taskId, accessToken, updatedDescription, userId))
    setPickedId('')
    setUpdatedDescription('')
  }
  
  return (
    <>
    <TaskWrapper>
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          {allTasks.map((item) => (
            <Task key={item._id} completed={item.completed}>
              <div>
                <Checkbox 
                  id='completed'
                  checked={item.completed}
                  type='checkbox' 
                  onChange={() => dispatch(toggleIsComplete(item._id, item.completed, item.completedAt, accessToken, userId))}
                />
                {item._id === pickedId && item.completed === false ? 
                  <>
                    <input 
                      type='text'
                      value={updatedDescription}
                      onChange={event => {setUpdatedDescription(event.target.value)}} 
                    />
                    <button 
                      type='submit'
                      onClick={() => onUpdateTodo(item._id, accessToken, updatedDescription, userId)}>Save
                    </button>
                  </>
                  : 
                  <TaskDescription
                    htmlFor='completed'
                    completed={item.completed}>{item.description}
                  </TaskDescription>
                }
              </div>

              <TaskSettings>
                {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                <div onClick={() => setPickedId(item._id)}><Icon>{penIcon}</Icon></div>
                <div onClick={() => dispatch(deleteTodo(accessToken, userId, item._id))}><Icon>{trashCanIcon}</Icon></div>
              </TaskSettings>
            </Task>
          ))}
        </>
      )}
      <AddTask />
    </TaskWrapper>

    </>
  )
};

export default TaskList;

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
`;

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${props => props.completed ? '#B4B2B2' : '#592101'};
  width: 70%;
`
const TaskSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /*width: 20%;*/
  gap: 20px;
`

const TaskDescription = styled.label`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`
const Icon = styled.i`
  color: #B4B2B2;
  font-size: 16px;
`

const Checkbox = styled.input`
  :checked {
    border: 2px solid #D75004;
  }
`
