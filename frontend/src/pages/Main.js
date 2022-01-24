import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'

import { API_URL } from "../utils/constants";
import tasks from "../reducers/tasks";
import user from "../reducers/user";
import styled from "styled-components";

const Main = () => {
  const allTasks = useSelector((store) => store.tasks.items);
  console.log(allTasks)
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const [task, setTask] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    // fetching all the tasks of a user from the API
    fetch(API_URL(`tasks/${userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(tasks.actions.setItems(data.response));
          dispatch(tasks.actions.setError(null));
        } else {
          dispatch(tasks.actions.setItems([]));
          dispatch(tasks.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch, userId]);

  // posting a new task
  const onAddTodo = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ description: task, user: userId }),
    };

    fetch(API_URL("tasks"), options)
      .then((res) => res.json())
      .then((data) => console.log("ADD", data))
      .finally(() => setTask(""));
  };

  // deleting a task
  const onDeleteTodo = (taskId) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ user: userId }),
    };

    fetch(API_URL(`tasks/${taskId}`), options)
      .then((res) => res.json())
      .then((data) => console.log("DELETE", data));
  };

  // updating/editing an existing task
  const onUpdateTodo = (taskId) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ description: task, user: userId }),
    };

    fetch(API_URL(`tasks/${taskId}/update`), options)
      .then((res) => res.json())
      .then((data) => console.log("UPDATE", data));
  };

  // complete an existing task
  const onToggleIsComplete = (taskId) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ description: task, user: userId }),
    };

    fetch(API_URL(`tasks/${taskId}/complete`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
  };

  const trashCanIcon = <FontAwesomeIcon icon={faTrash} />
  const penIcon = <FontAwesomeIcon icon={faPen} />
  const plusIcon = <FontAwesomeIcon icon={faPlus} />

  return (
    <MainContainer>
      <TimerContainer>
        Pomodoro timer goes here
      </TimerContainer>
      <TaskContainer>
        {allTasks.map((item) => (
          <Task key={item._id}>
            <TextContainer>
              <input 
                id='completed'
                type='checkbox' 
                onChange={() => onToggleIsComplete(item._id)}
              />
              <label
                htmlFor='completed'>{item.description}
              </label>
            </TextContainer>
            <ButtonsContainer>
              {/* Edit/Update feature below needs to be fixed so that user can edit the items. https://ibaslogic.com/how-to-edit-todos-items-in-react/ */}
              <div onDoubleClick={() => onUpdateTodo(item._id)}><Icon>{penIcon}</Icon></div>
              <Button onClick={() => onDeleteTodo(item._id)}><Icon>{trashCanIcon}</Icon></Button>
            </ButtonsContainer>
          </Task>
        ))}
        <AddTaskContainer>
          <Button onClick={onAddTodo}><Icon props="plus">{plusIcon}</Icon></Button>
          <input
            id="task"
            type="text"
            value={task}
            placeholder="Add task here..."
            onChange={(e) => setTask(e.target.value)}
          />
        </AddTaskContainer>
      </TaskContainer>

      <button onClick={() => dispatch(user.actions.setAccessToken(null))}>
        Log out
      </button>
    </MainContainer>
  );
};

export default Main;


const MainContainer = styled.div`
  /*height: auto;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;*/
  background: #202D48;
`;

const TextContainer = styled.div`
  width:80%;
  margin-left: 20px;
  
`;

const TimerContainer = styled.div`
  background: linear-gradient(270.42deg, #D75004 0.3%, #8A3403 99.58%);
  width:100%;
  height: auto;
  text-align:center;
`; 

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

//const ToDoLabel = styled.label`
//  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
//`


