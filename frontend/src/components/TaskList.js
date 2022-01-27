import React, { useEffect, useState }from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { showTasklist, updateTodo, deleteTodo, toggleIsComplete } from "../reducers/tasks";
import AddTask from './AddTask';
import LoadingIndicator from './LoadingIndicator';

// import { FormWrapper } from "styled-components/Styling"
import styled from "styled-components";
import { Icon } from "styled-components/Styling";

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
    <div>
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          {allTasks.map((item) => (
            <div key={item._id}>
              <input 
                id='completed'
                type='checkbox' 
                onChange={() => {
                  dispatch(toggleIsComplete(item._id, item.completed, item.completedAt, accessToken, userId))
                  console.log(item)
                }}
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
              <TaskSettings>
                {/* Edit/Update feature: https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
                <div onClick={() => setPickedId(item._id)}><Icon>{penIcon}</Icon></div>
                <div onClick={() => dispatch(deleteTodo(accessToken, userId, item._id))}><Icon>{trashCanIcon}</Icon></div>
              </TaskSettings>
            </div>
          ))}
          <AddTask />
        </>
      )}
    </div>
  )
};

export default TaskList;

const TaskSettings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 20%;
  margin-right: 10px;
`;

const TaskDescription = styled.label`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`
